def failed = false;

node {
    stage('Setup') {
        try {
            script {
                echo 'Pull code from source repository'
                checkout scm
            }
            script {
                echo 'Pull delivery scripts'
                sh 'rm -rf script-delivery-py'
                sh 'git clone $SCRIPTS_DELIVERY_PY_GIT_URL script-delivery-py'
            }
            script {
                echo 'Execute increment script'
                sh 'python3 -m pip install -r ./script-delivery-py/requirements.txt'
                sh './script-delivery-py/setup/increment/increment.py'
            }
            script {
                echo 'Execute prerequisites script'
                sh './script-delivery-py/setup/prereqs/prereqs.py'
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
                        sh './script-delivery-py/authoring/build/build.py'
                    }
                    script {
                        echo 'Execute test script'
                        sh './script-delivery-py/authoring/test/test.py'
                    }
                    script {
                        echo 'Execute package script'
                        sh './script-delivery-py/authoring/package/package.py'
                    }
                    script {
                        echo 'Execute publish script'
                        sh './script-delivery-py/authoring/publish/publish.py'
                    }
                    script {
                        echo 'Execute tag script'
                        sh './script-delivery-py/authoring/tag/tag.py'
                    }
                }
                catch (exc) {
                    throw exc
                }
                finally {
                    script {
                        echo 'Execute clean script'
                        sh './script-delivery-py/authoring/clean/clean.py'
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

    stage('Integration') {
        if (failed != true) {
            try {
                script {
                    echo 'Execute prepare script'
                    sh './script-delivery-py/integration/prepare/prepare.py'
                }
                script {
                    echo 'Execute deploy script'
                    sh './script-delivery-py/integration/deploy/deploy.py'
                }
                script {
                    echo 'Execute ci_test script'
                    sh './script-delivery-py/integration/ci_test/ci_test.py'
                }
                script {
                    echo 'Execute rollback script'
                    sh './script-delivery-py/integration/rollback/rollback.py'
                }
            }
            catch (exc) {
                echo 'Error on integration stage'
                failed = true
            }
        } else {
            echo 'Integration stage skipped because previous stage failed.'
        }
    }

    stage('Assembling') {
        if (failed != true) {
            try {
                script {
                    echo 'Execute baseline script'
                    sh './script-delivery-py/assembling/baseline/baseline.py'
                }
                script {
                    echo 'Execute package_assembly script'
                    sh './script-delivery-py/assembling/package_assembly/package_assembly.py'
                }
                script {
                    echo 'Execute publish_assembly script'
                    sh './script-delivery-py/assembling/publish_assembly/publish_assembly.py'
                }
            }
            catch (exc) {
                echo 'Error on assembling stage'
                failed = true
            }
        } else {
            echo 'Assembling stage skipped because previous stage failed.'
        }
    }

    stage('Acceptance') {
        if (failed != true) {
            try {
                script {
                    echo 'Execute functional script'
                    sh './script-delivery-py/acceptance/functional/functional.py'
                }
                script {
                    echo 'Execute benchmark script'
                    sh './script-delivery-py/acceptance/benchmark/benchmark.py'
                }
                script {
                    echo 'Execute certify script'
                    sh './script-delivery-py/acceptance/certify/certify.py'
                }
            }
            catch (exc) {
                echo 'Error on acceptance stage'
                failed = true
            }
        } else {
            echo 'Acceptance stage skipped because previous stage failed.'
        }
    }

    stage('Release') {
        if (failed != true) {
            try {
                script {
                    echo 'Execute document script'
                    sh './script-delivery-py/release/document/document.py'
                }
                script {
                    echo 'Execute release script'
                    sh './script-delivery-py/release/release/release.py'
                }
                script {
                    echo 'Execute notify script'
                    sh './script-delivery-py/release/notify/notify.py'
                }
            }
            catch (exc) {
                echo 'Error on release stage'
                failed = true
            }
        } else {
            echo 'Release stage skipped because previous stage failed.'
        }
    }

    stage('Measure') {
        try {
            script {
                echo 'Execute measure script'
                sh '''
                    GIT_ORG=$(echo $JOB_NAME | awk -F '/' '{print $1}')
                    GIT_REPO_NAME=$(echo $JOB_NAME | awk -F '/' '{print $2}')
                    ./script-delivery-py/measure/measure.py \"$GIT_ORG\" \"$GIT_REPO_NAME\" \"$AWS_ACCESS_KEY_ID\" \"$AWS_SECRET_ACCESS_KEY\" \"$AWS_S3_BUCKET\" \"$GIT_TOKEN\" \"$JOB_URL\"
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
