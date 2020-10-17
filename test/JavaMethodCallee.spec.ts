import { expect } from "chai";
import TestUtil from "./TestUtil";
import * as fs from "fs-extra";

describe("Testing call graph against manually created oracle", function () {
    const callGraphDataDir: string = '/callGraphData';
    const oracleDir: string = '/testOracle';
    const datasetsToCheck: string[] = [
        'calculator-example'
    ]
    it("Validate the test data with manually curated oracle", () => {
        let id: string = '', tmpId: string = '', methodSignature: string = '';
        let jsonFile: any, oracleJsonFile: any;
        let files: string[], fileName: string;
        for (const repo of datasetsToCheck) {
            files = TestUtil.readAllFiles(__dirname + callGraphDataDir + "/" + repo);
            for (const f of files) {
                fileName = f.replace(__dirname + callGraphDataDir + "/" + repo + "/", "");
                try {
                    jsonFile = TestUtil.getJSON(f);
                    oracleJsonFile = TestUtil.getJSON(__dirname + oracleDir + "/" + repo + "/" + fileName)
                    for (const obj of jsonFile) {
                        id = TestUtil.generateTestObjID(obj);
                        if( id in oracleJsonFile) {
                            expect(obj.path.includes(oracleJsonFile[id].path)).to.be.true;
                            expect(obj.calledMethods.length).to.be.eql(Object.keys(oracleJsonFile[id].calledMethods).length)
                            if(obj.calledMethods.length > 0) {
                                for (let fm of obj.calledMethods) {
                                    tmpId = TestUtil.generateTestObjID(fm)
                                    methodSignature = oracleJsonFile[id]['calledMethods'][tmpId].fullQualifiedSignature;
                                    expect(fm.fullQualifiedSignature).to.be.eql(methodSignature)
                                }
                            }

                        }
                    }
                } catch (err) {
                    console.log(`Error is file${f}: ${id}`);
                    throw err;
                }
            }
        }
    })
});
