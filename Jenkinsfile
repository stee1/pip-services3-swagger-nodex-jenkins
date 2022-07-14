def failed = false;

node {
    stage('Setup') {
        try {
            script {
                // echo 'Pull code from source repository'
                // checkout scm
            }
            script {
                echo 'Pull delivery scripts'
                // sh 'rm -rf script-delivery-ps'
                // sh 'git clone $SCRIPTS_DELIVERY_PS_GIT_URL script-delivery-ps'
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
        catch (exc) {
            echo 'Error on setup stage'
            failed = true
        }
    }

    stage('Authoring') {
        if (failed != true) {
            try {
                try {
                    script {
                        echo 'Execute build script'
                        // sh './script-delivery-ps/authoring/build/build.ps1'
                    }
                    script {
                        echo 'Execute test script'
                        // sh './script-delivery-ps/authoring/test/test.ps1'
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
                        // sh './script-delivery-ps/authoring/tag/tag.ps1'
                    }
                    script {
                        echo 'Execute release script'
                        sh './script-delivery-ps/authoring/release/release.ps1'
                    }
                }
                catch (exc) {
                    throw exc
                }
                finally {
                    script {
                        echo 'Execute clean script'
                        // sh './script-delivery-ps/authoring/clean/clean.ps1'
                    }
                }
            }
            catch (exc) {
                echo 'Error on authoring stage'
                failed = true
            }
        } else {
            echo 'Authoring stage skipped because previous stage failed.'
        }
    }

    stage('Measure') {
        try {
            script {
                echo 'Execute measure script. DISABLED'
                sh 'GIT_ORG=$(echo $JOB_NAME | awk -F "/" "{print $1}")'
                sh 'echo $GIT_ORG'
                sh 'GIT_REPO_NAME=$(echo $JOB_NAME | awk -F "/" "{print $2}")'
                sh './script-delivery-ps/measure/measure.ps1 $GIT_ORG $GIT_REPO_NAME $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY $AWS_S3_BUCKET $GIT_TOKEN @{jenkinsJobUrl="$JOB_URL"}'
            }
        }
        catch (exc) {
            echo 'Error on measure'
            failed = true
        }
        finally {
            if (failed == true) {
                echo 'Error somewhere on pipeline'
                sh 'exit 1'
            }
        }
    }
}
