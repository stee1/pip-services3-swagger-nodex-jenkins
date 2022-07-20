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

    // stage('Integration') {
    //     try {
    //         script {
    //             echo 'Execute prepare script'
    //             sh './script-delivery-ps/integration/prepare/prepare.ps1'
    //         }
    //         script {
    //             echo 'Execute deploy script'
    //             sh './script-delivery-ps/integration/deploy/deploy.ps1'
    //         }
    //         script {
    //             echo 'Execute ci_test script'
    //             sh './script-delivery-ps/integration/ci_test/ci_test.ps1'
    //         }
    //         script {
    //             echo 'Execute rollback script'
    //             sh './script-delivery-ps/integration/rollback/rollback.ps1'
    //         }
    //     }
    //     catch (exc) {
    //         echo 'Error on integration stage'
    //         failed = true
    //     }
    // }

    // stage('Assembling') {
    //     try {
    //         script {
    //             echo 'Execute baseline script'
    //             sh './script-delivery-ps/assembling/baseline/baseline.ps1'
    //         }
    //         script {
    //             echo 'Execute package_assembly script'
    //             sh './script-delivery-ps/assembling/package_assembly/package_assembly.ps1'
    //         }
    //         script {
    //             echo 'Execute publish_assembly script'
    //             sh './script-delivery-ps/assembling/publish_assembly/publish_assembly.ps1'
    //         }
    //     }
    //     catch (exc) {
    //         echo 'Error on assembling stage'
    //         failed = true
    //     }
    // }

    // stage('Acceptance') {
    //     try {
    //         script {
    //             echo 'Execute functional script'
    //             sh './script-delivery-ps/acceptance/functional/functional.ps1'
    //         }
    //         script {
    //             echo 'Execute benchmark script'
    //             sh './script-delivery-ps/acceptance/benchmark/benchmark.ps1'
    //         }
    //         script {
    //             echo 'Execute certify script'
    //             sh './script-delivery-ps/acceptance/certify/certify.ps1'
    //         }
    //     }
    //     catch (exc) {
    //         echo 'Error on acceptance stage'
    //         failed = true
    //     }
    // }

    // stage('Release') {
    //     try {
    //         script {
    //             echo 'Execute document script'
    //             sh './script-delivery-ps/release/document/document.ps1'
    //         }
    //         script {
    //             echo 'Execute release script'
    //             sh './script-delivery-ps/release/release/release.ps1'
    //         }
    //         script {
    //             echo 'Execute notify script'
    //             sh './script-delivery-ps/release/notify/notify.ps1'
    //         }
    //     }
    //     catch (exc) {
    //         echo 'Error on release stage'
    //         failed = true
    //     }
    // }

    stage('Measure') {
        try {
            script {
                echo 'Execute measure script. DISABLED'
                // sh 'GIT_ORG=$(echo $JOB_NAME | awk -F "/" "{print $1}")'
                // sh 'echo $GIT_ORG'
                // sh 'GIT_REPO_NAME=$(echo $JOB_NAME | awk -F "/" "{print $2}")'
                sh '''
                    GIT_ORG=$($JOB_NAME | awk -F '/' '{print $1}')
                    echo $GIT_ORG
                    GIT_REPO_NAME=$(echo $JOB_NAME | awk -F '/' '{print $2}')
                    ./script-delivery-ps/measure/measure.ps1 '$GIT_ORG' $GIT_REPO_NAME $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY $AWS_S3_BUCKET $GIT_TOKEN $JOB_URL}
                '''
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
