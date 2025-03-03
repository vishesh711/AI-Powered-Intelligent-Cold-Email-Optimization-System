from typing import Any, Dict, List, Optional

import numpy as np
import pandas as pd
from sklearn.cluster import DBSCAN, KMeans
from sklearn.decomposition import PCA
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler


class SegmentationService:
    """Service for segmenting prospects using machine learning algorithms."""

    def segment_prospects(
        self,
        prospect_data: List[Dict[str, Any]],
        algorithm: str = "kmeans",
        n_clusters: int = 5,
        params: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Segment prospects using the specified algorithm.

        Args:
            prospect_data: List of prospect data dictionaries
            algorithm: Clustering algorithm to use (kmeans, dbscan, hierarchical)
            n_clusters: Number of clusters to create (for kmeans and hierarchical)
            params: Additional parameters for the clustering algorithm

        Returns:
            Dictionary containing segmentation results
        """
        if not prospect_data:
            return {
                "segments": [],
                "visualization_data": {},
                "n_clusters": 0,
                "algorithm": algorithm,
            }

        # Convert prospect data to features
        features, feature_names = self._extract_features(prospect_data)

        # Standardize features
        scaler = StandardScaler()
        scaled_features = scaler.fit_transform(features)

        # Perform clustering
        if algorithm == "kmeans":
            clusters, cluster_centers = self._kmeans_clustering(
                scaled_features, n_clusters
            )
        elif algorithm == "dbscan":
            clusters, cluster_centers = self._dbscan_clustering(scaled_features, params)
            n_clusters = len(set(clusters)) - (1 if -1 in clusters else 0)
        elif algorithm == "hierarchical":
            clusters, cluster_centers = self._hierarchical_clustering(
                scaled_features, n_clusters
            )
        else:
            raise ValueError(f"Unsupported algorithm: {algorithm}")

        # Create visualization data (PCA for 2D visualization)
        visualization_data = self._create_visualization_data(
            scaled_features, clusters, cluster_centers
        )

        # Create segments
        segments = self._create_segments(
            prospect_data, clusters, feature_names, scaled_features, cluster_centers
        )

        return {
            "segments": segments,
            "visualization_data": visualization_data,
            "n_clusters": n_clusters,
            "algorithm": algorithm,
        }

    def _extract_features(self, prospect_data: List[Dict[str, Any]]) -> tuple:
        """Extract numerical and categorical features from prospect data."""
        # Create a DataFrame from prospect data
        df = pd.DataFrame(prospect_data)

        # Handle missing values
        df = df.fillna(
            {
                "company_size": "unknown",
                "industry": "unknown",
                "job_title": "unknown",
                "seniority": "unknown",
                "location": "unknown",
            }
        )

        # Extract numerical features
        numerical_features = []

        # Convert company size to numerical value
        size_mapping = {
            "unknown": 0,
            "1-10": 1,
            "11-50": 2,
            "51-200": 3,
            "201-500": 4,
            "501-1000": 5,
            "1001-5000": 6,
            "5001-10000": 7,
            "10001+": 8,
        }

        if "company_size" in df.columns:
            df["company_size_num"] = df["company_size"].map(
                lambda x: size_mapping.get(x, 0)
            )
            numerical_features.append("company_size_num")

        # Convert seniority to numerical value
        seniority_mapping = {
            "unknown": 0,
            "entry": 1,
            "junior": 2,
            "mid": 3,
            "senior": 4,
            "executive": 5,
            "c-level": 6,
        }

        if "seniority" in df.columns:
            df["seniority_num"] = df["seniority"].map(
                lambda x: seniority_mapping.get(x, 0)
            )
            numerical_features.append("seniority_num")

        # Process categorical features using TF-IDF
        categorical_features = ["industry", "job_title", "location"]
        categorical_features = [f for f in categorical_features if f in df.columns]

        tfidf_features = []
        feature_names = numerical_features.copy()

        for feature in categorical_features:
            vectorizer = TfidfVectorizer(max_features=10)
            tfidf = vectorizer.fit_transform(df[feature].astype(str))
            tfidf_df = pd.DataFrame(
                tfidf.toarray(),
                columns=[
                    f"{feature}_{term}" for term in vectorizer.get_feature_names_out()
                ],
            )
            df = pd.concat([df, tfidf_df], axis=1)
            tfidf_features.extend(tfidf_df.columns)
            feature_names.extend(tfidf_df.columns)

        # Combine numerical and TF-IDF features
        features = df[numerical_features + tfidf_features].values

        return features, feature_names

    def _kmeans_clustering(self, features, n_clusters):
        """Perform K-means clustering."""
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        clusters = kmeans.fit_predict(features)
        return clusters, kmeans.cluster_centers_

    def _dbscan_clustering(self, features, params):
        """Perform DBSCAN clustering."""
        eps = params.get("eps", 0.5) if params else 0.5
        min_samples = params.get("min_samples", 5) if params else 5

        dbscan = DBSCAN(eps=eps, min_samples=min_samples)
        clusters = dbscan.fit_predict(features)

        # DBSCAN doesn't have cluster centers, so we compute them manually
        unique_clusters = set(clusters)
        cluster_centers = []

        for cluster_id in unique_clusters:
            if cluster_id == -1:  # Noise points
                # Use the mean of all points as the center for noise
                cluster_centers.append(np.mean(features, axis=0))
            else:
                # Use the mean of points in this cluster
                cluster_mask = clusters == cluster_id
                cluster_centers.append(np.mean(features[cluster_mask], axis=0))

        return clusters, np.array(cluster_centers)

    def _hierarchical_clustering(self, features, n_clusters):
        """Perform hierarchical clustering."""
        from sklearn.cluster import AgglomerativeClustering

        hierarchical = AgglomerativeClustering(n_clusters=n_clusters)
        clusters = hierarchical.fit_predict(features)

        # Compute cluster centers
        cluster_centers = []
        for i in range(n_clusters):
            cluster_mask = clusters == i
            cluster_centers.append(np.mean(features[cluster_mask], axis=0))

        return clusters, np.array(cluster_centers)

    def _create_visualization_data(self, features, clusters, cluster_centers):
        """Create 2D visualization data using PCA."""
        # Apply PCA to reduce to 2 dimensions
        pca = PCA(n_components=2)
        pca_result = pca.fit_transform(features)

        # Transform cluster centers
        pca_centers = pca.transform(cluster_centers)

        # Create visualization data
        unique_clusters = sorted(set(clusters))

        datasets = []
        for cluster_id in unique_clusters:
            cluster_mask = clusters == cluster_id
            cluster_points = pca_result[cluster_mask]

            if len(cluster_points) > 0:
                datasets.append(
                    {
                        "label": f"Segment {cluster_id + 1}"
                        if cluster_id != -1
                        else "Outliers",
                        "data": [
                            {"x": float(point[0]), "y": float(point[1])}
                            for point in cluster_points
                        ],
                        "backgroundColor": f"rgba({(cluster_id * 50) % 256}, {(cluster_id * 100) % 256}, {(cluster_id * 150) % 256}, 0.5)"
                        if cluster_id != -1
                        else "rgba(0, 0, 0, 0.3)",
                    }
                )

        return {
            "datasets": datasets,
            "centers": [
                {"x": float(center[0]), "y": float(center[1])} for center in pca_centers
            ],
        }

    def _create_segments(
        self, prospect_data, clusters, feature_names, scaled_features, cluster_centers
    ):
        """Create segment descriptions based on clustering results."""
        unique_clusters = sorted(set(clusters))
        segments = []

        for cluster_id in unique_clusters:
            if cluster_id == -1:  # Noise points in DBSCAN
                name = "Outliers"
                description = "Prospects that don't fit well into other segments"
            else:
                # Get indices of prospects in this cluster
                cluster_indices = np.where(clusters == cluster_id)[0]

                # Count prospects in this cluster
                size = len(cluster_indices)

                # Find the center of this cluster
                center = cluster_centers[cluster_id if cluster_id != -1 else 0]

                # Find the most important features for this cluster
                feature_importance = np.abs(center - np.mean(scaled_features, axis=0))
                top_features_idx = np.argsort(feature_importance)[-3:]  # Top 3 features

                # Create segment name and description
                name = f"Segment {cluster_id + 1}"

                # Create description based on top features
                top_features = [feature_names[i] for i in top_features_idx]
                description = f"Characterized by {', '.join(top_features)}"

                # Get prospect IDs in this segment
                prospect_ids = [prospect_data[i]["id"] for i in cluster_indices]

                segments.append(
                    {
                        "segment_id": cluster_id if cluster_id != -1 else -1,
                        "name": name,
                        "description": description,
                        "size": size,
                        "prospects": prospect_ids,
                    }
                )

        return segments


segmentation_service = SegmentationService()
