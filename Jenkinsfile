def failed = false;

node {
    stage('Setup') {
        try {
            script {
                echo 'Pull delivery scripts'
                sh 'rm -rf script-delivery-ps'
                sh 'git clone $SCRIPTS_DELIVERY_PS_GIT_URL script-delivery-ps'
            }
            script {
                echo 'Execute increment script'
                pwsh './script-delivery-ps/setup/increment/increment.ps1'
            }
            script {
                echo 'Execute prerequisites script'
                pwsh './script-delivery-ps/setup/prereqs/prereqs.ps1'
            }
        }
        catch (exc) {
            echo 'error on setup hadled'
            failed = true
            // throw
        }
    }

    stage('Authoring') {
        if (flag == true) {
            try {
                try {
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
                catch (exc) {
                    echo 'error on authoring1 handed'
                }
                finally {
                    script {
                        echo 'Execute clean script'
                        sh './script-delivery-ps/authoring/clean/clean.ps1'
                    }
                }
            }
            catch (exc) {
                echo 'error on authoring2 hadled'
                failed = true
                // throw
            }
        } else {
            echo 'previous step failed'
        }
    }

    stage('Measure') {
        try {
            script {
                echo 'Execute measure script'
                sh './script-delivery-ps/authoring/measure/measure.ps1'
            }
        }
        catch (exc) {
            echo 'error on measure hadled'
            failed = true
            // throw
        }
        finally {
            if (failed == true) {
                echo 'Error somewhere on pipeline'
            } else {
                echo 'Pipeline successfull'
            }
        }
    }
}
