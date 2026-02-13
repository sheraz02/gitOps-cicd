# EKS 3-Tier GitOps Architecture with Terraform, CI/CD, and Monitoring

This repository demonstrates a **production-ready architecture** for deploying a **3-tier application** inside an **Amazon EKS Cluster** using **GitOps**, **CI/CD**, **Terraform**, and **Monitoring tools**.

The architecture includes:

- **Infrastructure as Code (IaC)** with Terraform to provision AWS resources.
- **CI/CD Pipeline** using Jenkins to build Docker images and trigger deployments.
- **GitOps** with ArgoCD to manage Kubernetes resources.
- **3-Tier Application**:
  - Frontend Tier (exposed via Load Balancer)
  - Backend Tier
  - Database Tier
- **Kubernetes Network Policies** to control communication between tiers.
- **Monitoring Stack** using Prometheus and Grafana.

---

## 🏗 Architecture Overview

<img width="1705" height="857" alt="architecture-diagram" src="https://github.com/user-attachments/assets/96a9d999-4245-47d4-b070-18217cbecacb" />
