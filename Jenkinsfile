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
                script {
                    echo 'Execute prerequisites script'
                    sh './script-delivery-ps/setup/prereqs/prereqs.ps1'
                }
            }
        }

        stage('Authoring') {
            steps {
                script {
                    echo 'Execute build script'
                    sh './script-delivery-ps/authoring/build/build.ps1'
                }
                script {
                    echo 'Execute test script'
                    sh './script-delivery-ps/authoring/test/test.ps1'
                }
                script {
                    echo 'Execute package script'
                    sh './script-delivery-ps/authoring/package/package.ps1'
                }
                script {
                    echo 'Execute publish script'
                    sh './script-delivery-ps/authoring/publish/publish.ps1'
                }
                script {
                    echo 'Execute tag script'
                    sh './script-delivery-ps/authoring/tag/tag.ps1'
                }
                script {
                    echo 'Execute release script'
                    sh './script-delivery-ps/authoring/release/release.ps1'
                }
            }
            post {
                always {
                    echo 'Execute clean script'
                    sh './script-delivery-ps/authoring/clean/clean.ps1'
                }
            }
        }
    }

    post {
        always {
            echo 'Execute clean script'
            // sh './script-delivery-ps/authoring/clean/clean.ps1'
        }
    }
}
