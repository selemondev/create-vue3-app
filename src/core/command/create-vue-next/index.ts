import program from '../../program'
import createVueQuestions from '../../questions/vue/createVueQuestions'
import initialLog from '../create-vue-next/initialLog'
import installDeps from '../create-vue-next/install'
import copyTemplate from '../create-vue-next/copyTemplate'
async function createProject() {
  await initialLog()
  await createVueQuestions()
  await copyTemplate()
  await installDeps()
}

export default async function createVueNext() {
  program
    .description('init Vue3 + Vite3 + Typescript project   📑  📑')
    .action(async () => {
      createProject()
    })
}
