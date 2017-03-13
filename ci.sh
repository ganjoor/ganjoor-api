#!/bin/bash

# Exit on any error
set -e

# Setting environment variables
if [ "${CIRCLE_BRANCH}" == "prod" ]; then
  export DEPLOY_ENV="${DEPLOY_ENV_PROD}"
  export PROJECT_NAME="${PROJECT_NAME_PROD}"
  export CLUSTER_NAME="${CLUSTER_NAME_PROD}"
  export CLOUDSDK_COMPUTE_ZONE="${CLOUDSDK_COMPUTE_ZONE_PROD}"
else
  export DEPLOY_ENV="${DEPLOY_ENV_DEV}"
  export PROJECT_NAME="${PROJECT_NAME_DEV}"
  export CLUSTER_NAME="${CLUSTER_NAME_DEV}"
  export CLOUDSDK_COMPUTE_ZONE="${CLOUDSDK_COMPUTE_ZONE_DEV}"
fi

# Image URL
export IMAGE_URL="gcr.io/${PROJECT_NAME}/${APP_NAME}"

# Configuring gcloud
setup-gcloud() {
  # Export $ACCT_AUTH_PROD and $ACCT_AUTH_DEV in CircleCI web interface
  if [ "${CIRCLE_BRANCH}" == "prod" ]; then
    echo ${ACCT_AUTH_PROD} | base64 --decode -i > ${GOOGLE_APPLICATION_CREDENTIALS}
  else
    echo ${ACCT_AUTH_DEV} | base64 --decode -i > ${GOOGLE_APPLICATION_CREDENTIALS}
  fi
  gcloud auth activate-service-account --key-file ${GOOGLE_APPLICATION_CREDENTIALS}
  gcloud config set project ${PROJECT_NAME}
  gcloud config set container/cluster ${CLUSTER_NAME}
  gcloud config set compute/zone ${CLOUDSDK_COMPUTE_ZONE}
  gcloud container clusters get-credentials ${CLUSTER_NAME}
}

# Building the images
build() {
  yarn
  yarn build
  docker build -t ${IMAGE_URL}:${CIRCLE_SHA1} .
}

# Test Cases
run-tests() {
  echo "Add tests here"
}

# Tagging & Pushing Images to Registry
deploy() {
  docker tag ${IMAGE_URL}:${CIRCLE_SHA1} ${IMAGE_URL}:latest
  gcloud docker -- push ${IMAGE_URL}:${CIRCLE_SHA1}
  gcloud docker -- push ${IMAGE_URL}:latest

  # Deploy apps on GKE
  FILENAME=$(grep -rl ${IMAGE_URL}:latest ./k8s/${DEPLOY_ENV}/)
  for i in ${FILENAME}; do
    sed -i -e "s/\(image:.*\):latest/\1:${CIRCLE_SHA1}/g" ${i}
  done
  kubectl apply -f ./k8s/${DEPLOY_ENV}/
}

case $1 in
  setup-gcloud)
    setup-gcloud
  ;;
  run-tests)
    run-tests
  ;;
  build)
    build
  ;;
  deploy)
    deploy
  ;;
  *)
    echo "Usage: $0 {setup-gcloud|run-tests|build|deploy}"
    exit 1
  ;;
esac
