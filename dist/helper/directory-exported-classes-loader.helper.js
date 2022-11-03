"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryExportedClassesLoaderHelper = void 0;
const path = __importStar(require("path"));
const glob = __importStar(require("glob"));
/**
 * Helper to load exported classes
 */
class DirectoryExportedClassesLoaderHelper {
    /**
     * Loads all exported classes from the given directory
     */
    static importClassesFromDirectories(directories, formats = ['.js', '.ts']) {
        const loadFileClasses = function (exported, allLoaded) {
            if (exported instanceof Function) {
                allLoaded.push(exported);
            }
            else if (exported instanceof Object) {
                Object.keys(exported).forEach(key => loadFileClasses(exported[key], allLoaded));
            }
            else if (exported instanceof Array) {
                exported.forEach((i) => loadFileClasses(i, allLoaded));
            }
            return allLoaded;
        };
        const allFiles = directories.reduce((allDirs, dir) => {
            return allDirs.concat(glob.sync(path.normalize(dir)));
        }, []);
        const dirs = allFiles
            .filter(file => {
            const dtsExtension = file.substring(file.length - 5, file.length);
            return formats.indexOf(path.extname(file)) !== -1 && dtsExtension !== '.d.ts';
        })
            .map(file => {
            return require(file);
        });
        return loadFileClasses(dirs, []);
    }
}
exports.DirectoryExportedClassesLoaderHelper = DirectoryExportedClassesLoaderHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0b3J5LWV4cG9ydGVkLWNsYXNzZXMtbG9hZGVyLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXIvZGlyZWN0b3J5LWV4cG9ydGVkLWNsYXNzZXMtbG9hZGVyLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUE0QjtBQUM1QiwyQ0FBNEI7QUFFNUI7O0dBRUc7QUFDSCxNQUFhLG9DQUFvQztJQUM3Qzs7T0FFRztJQUNJLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxXQUEwQixFQUFFLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7UUFDM0YsTUFBTSxlQUFlLEdBQUcsVUFBVSxRQUFhLEVBQUUsU0FBMEI7WUFDdkUsSUFBSSxRQUFRLFlBQVksUUFBUSxFQUFFO2dCQUM5QixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2FBQzNCO2lCQUFNLElBQUksUUFBUSxZQUFZLE1BQU0sRUFBRTtnQkFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7YUFDbEY7aUJBQU0sSUFBSSxRQUFRLFlBQVksS0FBSyxFQUFFO2dCQUNsQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7YUFDOUQ7WUFFRCxPQUFPLFNBQVMsQ0FBQTtRQUNwQixDQUFDLENBQUE7UUFFRCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2pELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pELENBQUMsRUFBRSxFQUFtQixDQUFDLENBQUE7UUFFdkIsTUFBTSxJQUFJLEdBQUcsUUFBUTthQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDWCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNqRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBSyxPQUFPLENBQUE7UUFDakYsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1IsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEIsQ0FBQyxDQUFDLENBQUE7UUFFTixPQUFPLGVBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDcEMsQ0FBQztDQUNKO0FBaENELG9GQWdDQyJ9