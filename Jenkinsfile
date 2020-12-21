#!groovy

pipeline {
  agent any

  triggers {
    GenericTrigger(
      genericVariables: [
        [key: 'ref', value: '$.ref']
      ],

      causeString: 'Triggered on $ref',

      token: 'tokenNadinTimer',
      tokenCredentialId: '',

      printContributedVariables: true,
      printPostContent: true,

      silentResponse: false,

      regexpFilterText: '$ref',
      regexpFilterExpression: 'refs/heads/' + BRANCH_NAME
    )
  }

  options() {
    buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '3'))
    disableConcurrentBuilds()
    timeout(time: 60, unit: 'MINUTES')
  }

  environment {
    PRODUCT_NAME = "NadinTimer"
    NPM_CONFIG_PROGRESS = false
    NPM_CONFIG_SPIN = false
    NORMALIZED_BRANCH_NAME = env.BRANCH_NAME.replaceAll('[^a-zA-Z\\d\\s:]', '_')
    DOCKER_IMAGE_NAME = "nadin-timer" + "-branch_" + "${env.NORMALIZED_BRANCH_NAME}"
  }

  stages {
    stage('Docker Image') {
      steps {
        script {
          //noinspection GroovyUnusedAssignment
          def image = docker.build("${env.DOCKER_IMAGE_NAME}", "-f docker/Dockerfile-Buildimage docker")
        }
      }
    }

    stage('Prepare') {
      steps {
        script {
          docker.image("${env.DOCKER_IMAGE_NAME}").inside() {
            withEnv([
              /* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
              'npm_config_cache=npm-cache',
              /* set home to our current directory because other bower
              * nonsense breaks with HOME=/, e.g.:
              * EACCES: permission denied, mkdir '/.config'
              */
              'HOME=.',
            ]) {
              wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'XTerm']) {
                sh 'npm install'
              }
            }
          }
        }
      }
    }

    stage('Build') {
      steps {
        script {
          docker.image("${env.DOCKER_IMAGE_NAME}").inside() {
            withEnv([
              /* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
              'npm_config_cache=npm-cache',
              /* set home to our current directory because other bower
              * nonsense breaks with HOME=/, e.g.:
              * EACCES: permission denied, mkdir '/.config'
              */
              'HOME=.',
            ]) {
              sh 'rm -fr /builds/${PRODUCT_NAME}/'
              sh "npm run build:jenkins"
              sh 'mkdir -p /builds/${PRODUCT_NAME}/'
              sh 'chmod 777 /builds/${PRODUCT_NAME}/'
              sh 'cp -vr dist/nadin-timer/* /builds/${PRODUCT_NAME}/'
            }
          }
        }
      }
    }
  }

//    post {
//        always {
//            cleanWs()
//        }
//        failure {
//            script {
//                final def buildInfo = PRODUCT_NAME + ' ' + BRANCH_NAME + ' #' + BUILD_NUMBER
//                final def subject = 'Build failed: ' + buildInfo
//                final def body = '<html>The build for ' + buildInfo + ' <b>failed</b>, please check the attached logfile.</html>'
//
//                def to = emailextrecipients([[$class: 'CulpritsRecipientProvider'],
//                                             [$class: 'DevelopersRecipientProvider'],
//                                             [$class: 'UpstreamComitterRecipientProvider'],
//                                             [$class: 'FailingTestSuspectsRecipientProvider'],
//                                             [$class: 'RequesterRecipientProvider']])
//
//                emailext attachLog: true,
//                        mimeType: 'text/html',
//                        subject: subject,
//                        body: body,
//                        to: to
//            }
//        }
//    }
}
