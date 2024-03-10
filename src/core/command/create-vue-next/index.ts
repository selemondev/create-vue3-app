import program from '../../program'
import createVueQuestions from '../../questions/vue/createVueQuestions'
import initialLog from '../create-vue-next/initialLog'
import installDeps from '../create-vue-next/install'
import copyTemplate from '../create-vue-next/copyTemplate'
async function createProject() {
  await initialLog()
  await createVueQuestions()
  await copyTemplate()
  await installDeps();
}

export default async function createVueNext() {
  program
    .description(`Create Vue Next. The Next Generation Vue Scaffolding Tool ⚡`)
    .action(async () => {
      createProject()
    })
}
