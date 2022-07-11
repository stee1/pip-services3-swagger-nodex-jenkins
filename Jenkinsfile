// Variable to store pipeline status
def failed = false;

pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                script {
                    echo 'Pull code from source repository'
                    checkout scm
                }

                script {
                    echo 'Pull delivery scripts'
                    sh 'rm -rf script-delivery-ps'
                    sh 'git clone $SCRIPTS_DELIVERY_PS_GIT_URL script-delivery-ps'
                }
            }
        }
    }
}