import * as fs from "fs";

export default class TestUtil {
    static readAllFiles(currentPath: string): string[] {
        let filePaths: string[] = [];
        const filesInDir = TestUtil.attemptDirRead(currentPath);
        for (const file of filesInDir) {
            const fullPath = `${currentPath}/${file}`;
            if (file.endsWith(".json")) {
                filePaths.push(fullPath);
            }
        }
        return filePaths;
    }

    private static attemptDirRead(currentPath: string): string[] {
        try {
            return fs.readdirSync(currentPath);
        } catch (err) {
            console.log(`Error reading directory ${currentPath}`);
            throw err;
        }
    }

    public static generateTestObjID(obj: any) {
        let className: string = '', id: string = '';
        if ('startline' in obj && 'name' in obj && 'path' in obj  ) {
            className = obj.path.substring(obj.path.lastIndexOf('/')+1).replace(".java", "");
            id = className + '-' + obj.name + '-' + obj.startline;
        }
        return id;
    }

    public static getJSON(filepath: string): any {
        let content:Buffer = fs.readFileSync(filepath);
        return JSON.parse(content.toString());
    }
}