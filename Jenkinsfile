node {
    stage('Setup') {
        try {
            script{
                sh 'exit 1'
            }
        }
        catch (exc) {
            echo 'Something failed, I should sound the klaxons!'
            // throw
        }
    }
}