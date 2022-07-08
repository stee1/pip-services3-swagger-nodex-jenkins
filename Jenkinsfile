pipeline {
    agent any

    stages {
        stage('Example') {
            try {
                echo 'exiting'
                sh 'exit 1'
            }
            catch (exc) {
                echo 'Something failed, I should sound the klaxons!'
                throw
            }
        }

        // stage('Setup') {
        //     try {
        //         steps {
        //             script {
        //                 echo 'Pull delivery scripts'
        //                 sh 'rm -rf script-delivery-ps'
        //                 sh 'git clone $SCRIPTS_DELIVERY_PS_GIT_URL script-delivery-ps'
        //             }
        //             script {
        //                 echo 'Execute increment script'
        //                 sh './script-delivery-ps/setup/increment/increment.ps1'
        //             }
        //             script {
        //                 echo 'Execute prerequisites script'
        //                 sh './script-delivery-ps/setup/prereqs/prereqs.ps1'
        //             }
        //         }
        //     }
        //     catch (Exception e) {
        //         echo 'error on setup hadled'
        //     }
        // }

        // stage('Authoring') {
        //     steps {
        //         try {
        //             script {
        //                 echo 'Execute build script'
        //                 sh './script-delivery-ps/authoring/build/build.ps1'
        //             }
        //             script {
        //                 echo 'Execute test script'
        //                 sh './script-delivery-ps/authoring/test/test.ps1'
        //             }
        //             script {
        //                 echo 'Execute package script'
        //                 sh './script-delivery-ps/authoring/package/package.ps1'
        //             }
        //             script {
        //                 echo 'Execute publish script'
        //                 sh './script-delivery-ps/authoring/publish/publish.ps1'
        //             }
        //             script {
        //                 echo 'Execute tag script'
        //                 sh './script-delivery-ps/authoring/tag/tag.ps1'
        //             }
        //             script {
        //                 echo 'Execute release script'
        //                 sh './script-delivery-ps/authoring/release/release.ps1'
        //             }
        //         } 
        //         finally {
        //             script {
        //                 echo 'Execute clean script'
        //                 sh './script-delivery-ps/authoring/clean/clean.ps1'
        //             }
        //         }
        //     }
        // }

        // stage('Measure') {
        //     steps {
        //         script {
        //                 echo 'Execute release script'
        //                 sh './script-delivery-ps/authoring/release/release.ps1'
        //             }
        //     }
        // }
    }
}
