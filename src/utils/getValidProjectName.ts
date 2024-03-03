import validate from "validate-npm-package-name";

type validateProjectName =
    {
        valid: true
    }
    | 
    
    {
        valid: false,
        problems: string[]
    }

export const isValidProjectName = (projectName: string): validateProjectName => {
    const isProjectNameValid = validate(projectName);

    if (isProjectNameValid.validForNewPackages) {
        return { valid: true }
    }

    return {
        valid: false,
        problems: [
            ...(isProjectNameValid.errors || []),
            ...(isProjectNameValid.warnings || [])
        ]
    }
}