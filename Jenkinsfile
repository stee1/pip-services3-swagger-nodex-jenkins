pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                echo 'Pull delivery scripts'
                echo env.SCRIPTS_DELIVERY_PS_GIT_URL
                echo $SCRIPTS_DELIVERY_PS_GIT_URL
                echo ${SCRIPTS_DELIVERY_PS_GIT_URL}
                rm -rf script-delivery-ps
                git clone ${SCRIPTS_DELIVERY_PS_GIT_URL} script-delivery-ps
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
