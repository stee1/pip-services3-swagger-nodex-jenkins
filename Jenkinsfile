// Variable to store pipeline status
def failed = false;

pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                script {
                    echo 'Pull delivery scripts'
                    sh 'rm -rf script-delivery-ps'
                    sh 'git clone $SCRIPTS_DELIVERY_PS_GIT_URL script-delivery-ps'
                }

                script {
                    echo 'Execute increment script'
                    sh './script-delivery-ps/setup/increment/increment.ps1'
                }
            }
        }
    }
}