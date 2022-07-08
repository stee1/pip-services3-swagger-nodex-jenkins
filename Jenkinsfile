pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                echo 'Pull delivery scripts'
                // sh 'printenv'
                echo env.SCRIPTS_DELIVERY_PS_GIT_URL
                // echo "$SCRIPTS_DELIVERY_PS_GIT_URL"
                // echo "${SCRIPTS_DELIVERY_PS_GIT_URL}"
                sh 'rm -rf script-delivery-ps'
                git 'env.SCRIPTS_DELIVERY_PS_GIT_URL'
                sh 'ls -al'
                sh 'pwd'
                sh 'git clone $SCRIPTS_DELIVERY_PS_GIT_URL script-delivery-ps'
            }
        }

        stage('Authoring') {
            steps {
                echo 'build'
                exit 1
            }
             post {
                always {
                    echo 'clean'
                }
            }
        }
    }

    post {
        always {
            echo 'measure'
        }
    }
}
