pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                sh 'ls -al'
                sh 'pwd'
                echo 'Pull delivery scripts'
                echo env.SCRIPTS_DELIVERY_PS_GIT_URL
                echo $SCRIPTS_DELIVERY_PS_GIT_URL
                echo ${SCRIPTS_DELIVERY_PS_GIT_URL}
                sh 'rm -rf script-delivery-ps'
                sh 'git clone ${SCRIPTS_DELIVERY_PS_GIT_URL} script-delivery-ps'
            }
        }

        stage('Authoring') {
            steps {
                echo 'build'
            }
        }

        stage('Measure') {
            steps {
                echo 'measure'
            }
        }
    }
}
