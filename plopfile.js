const workspaces = ['apps']
const generators = ['app']

const defaultOutDirs = {
  app: 'apps'
}

/**
 * @param {import("plop").NodePlopAPI} plop
 */
module.exports = function main(plop) {
  generators.forEach((gen) => {
    plop.setGenerator(gen, {
      description: `Generates a ${gen}`,
      prompts: [
        {
          type: 'input',
          name: `${gen}Name`,
          message: `Enter ${gen} name:`,

          validate: (value) => {
            if (!value) {
              return `${gen} name is required`
            }

            // check is case is correct
            if (value !== value.toLowerCase()) {
              return `${gen} name must be in lowercase`
            }

            // cannot have spaces
            if (value.includes(' ')) {
              return `${gen} name cannot have spaces`
            }

            return true
          }
        },
        {
          type: 'input',
          name: 'description',
          message: `The description of this ${gen}:`
        },
        {
          type: 'list',
          name: 'outDir',
          message: `where should this ${gen} live?`,
          default: defaultOutDirs[gen],
          choices: workspaces,
          validate: (value) => {
            if (!value) {
              return `outDir is required`
            }

            return true
          }
        }
      ],
      actions(answers) {
        const actions = []

        if (!answers) return actions

        const { description, outDir } = answers
        const generatorName = answers[`${gen}Name`] ?? ''

        const data = {
          [`${gen}Name`]: generatorName,
          description,
          outDir
        }

        actions.push({
          type: 'addMany',
          templateFiles: `plop/${gen}/**`,
          destination: `./{{outDir}}/{{dashCase ${gen}Name}}`,
          base: `plop/${gen}`,
          data,
          abortOnFail: true,
          globOptions: {
            dot: true
          }
        })

        return actions
      }
    })
  })
}
