import createVueQuestions from '../../questions/vue/createVueQuestions'
import installDeps from '../create-vue-next/install'
import copyTemplate from '../create-vue-next/copyTemplate'
async function createProject() {
  await createVueQuestions()
  await copyTemplate()
  await installDeps();
}
export default async function createVueNext() {
  await createProject()
}
