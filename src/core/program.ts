import { Command } from 'commander'
import packageJson from "../../package.json"
const program = new Command(packageJson.name)

export default program