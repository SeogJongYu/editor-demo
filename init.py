import os
from pathlib import Path
from collections import OrderedDict


APP_NAME = input("App Name(example: bigtree_app): ")
APP_NATIVE_PACKAGE_NAME = input("Package Name(example: kr.ibigtree.app): ")

APP_NAME_CAMEL_CASE = ''.join(word.title() for word in APP_NAME.split('_'))

TARGET_FILENAME = [
    '.py',
    'pyproject.toml',
    '.md',
    '.json',
    '.code-workspace',
    '.js',
    'Dockerfile',
    'docker-compose.yml',
    '.dockerignore',
    '.gitignore',
    '.gradle',
    '_BUCK',
    '.java',
    '.xml',
    'Podfile',
    '.m',
    '.xib',
    '.pbxproj',
    '.xcscheme',
    '.xcworkspacedata',
    '.plist',
    '.rst',
]

SEARCH_AND_REPLACE = OrderedDict([
    ('bigtree_app_template', APP_NAME),
    ('kr.ibigtree.app', APP_NATIVE_PACKAGE_NAME),
    ('bigtree_app', APP_NAME),
    ('BIGTREE_APP_', APP_NAME.upper() + '_'),
    ('BIGTREE_APP', APP_NAME.upper()),
    ('BigtreeApp', APP_NAME_CAMEL_CASE),
])


def replace_all(content):
    for search, replace in SEARCH_AND_REPLACE.items():
        content = content.replace(search, replace)

    return content


def is_target_file(filename):
    for suffix in TARGET_FILENAME:
        if filename.endswith(suffix):
            return True

    return False


def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = replace_all(content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)



for path in Path().glob('**/*'):
    if path.samefile(Path(__file__)) or path.samefile(Path(".git")):
        continue

    absolute_path = str(path.absolute())


    if path.is_file() and is_target_file(absolute_path):
        process_file(absolute_path)


os.rename('bigtree_app', APP_NAME)
os.rename('bigtree_app_backend', APP_NAME + '_backend')
os.rename('bigtree_app_docker', APP_NAME + '_docker')
os.rename('bigtree_app_document', APP_NAME + '_document')

os.rename('bigtree_app_frontend/ios/bigtree_app.xcodeproj/xcshareddata/xcschemes/bigtree_app.xcscheme', 'bigtree_app_frontend/ios/bigtree_app.xcodeproj/xcshareddata/xcschemes/' + APP_NAME + '.xcscheme')
os.rename('bigtree_app_frontend/ios/bigtree_app.xcodeproj/xcshareddata/xcschemes/bigtree_app-tvOS.xcscheme', 'bigtree_app_frontend/ios/bigtree_app.xcodeproj/xcshareddata/xcschemes/' + APP_NAME + '-tvOS.xcscheme')
os.rename('bigtree_app_frontend/ios/bigtree_app.xcodeproj', 'bigtree_app_frontend/ios/' + APP_NAME + '.xcodeproj')

os.rename('bigtree_app_frontend/ios/bigtree_app.xcworkspace', 'bigtree_app_frontend/ios/' + APP_NAME + '.xcworkspace')
os.rename('bigtree_app_frontend/ios/bigtree_app-tvOS', 'bigtree_app_frontend/ios/' + APP_NAME + '-tvOS')
os.rename('bigtree_app_frontend/ios/bigtree_app-tvOSTests', 'bigtree_app_frontend/ios/' + APP_NAME + '-tvOSTests')
os.rename('bigtree_app_frontend/ios/bigtree_appTests/bigtree_appTests.m', 'bigtree_app_frontend/ios/bigtree_appTests/' + APP_NAME + 'Tests.m')
os.rename('bigtree_app_frontend/ios/bigtree_appTests', 'bigtree_app_frontend/ios/' + APP_NAME + 'Tests')
os.rename('bigtree_app_frontend/ios/bigtree_app', 'bigtree_app_frontend/ios/' + APP_NAME)

os.makedirs('bigtree_app_frontend/android/app/src/debug/java/' + APP_NATIVE_PACKAGE_NAME.replace(".", "/"), exist_ok=True)

os.rename(
    'bigtree_app_frontend/android/app/src/debug/java/kr/ibigtree/app/ReactNativeFlipper.java',
    'bigtree_app_frontend/android/app/src/debug/java/' + APP_NATIVE_PACKAGE_NAME.replace(".", "/") + '/ReactNativeFlipper.java',
)

os.makedirs('bigtree_app_frontend/android/app/src/main/java/' + APP_NATIVE_PACKAGE_NAME.replace(".", "/"), exist_ok=True)
os.rename(
    'bigtree_app_frontend/android/app/src/main/java/kr/ibigtree/app/MainActivity.java',
    'bigtree_app_frontend/android/app/src/main/java/' + APP_NATIVE_PACKAGE_NAME.replace(".", "/") + '/MainActivity.java',
)

os.rename(
    'bigtree_app_frontend/android/app/src/main/java/kr/ibigtree/app/MainApplication.java',
    'bigtree_app_frontend/android/app/src/main/java/' + APP_NATIVE_PACKAGE_NAME.replace(".", "/") + '/MainApplication.java',
)

os.rename('bigtree_app_template.png', APP_NAME + '.png')

remove_dirs = [
    'bigtree_app_frontend/android/app/src/debug/java/kr/ibigtree/app/',
    'bigtree_app_frontend/android/app/src/debug/java/kr/ibigtree/',
    'bigtree_app_frontend/android/app/src/debug/java/kr/',
    'bigtree_app_frontend/android/app/src/main/java/kr/ibigtree/app/',
    'bigtree_app_frontend/android/app/src/main/java/kr/ibigtree/',
    'bigtree_app_frontend/android/app/src/main/java/kr/',
]

for dirname in remove_dirs:
    try:
        os.unlink(dirname + '.DS_Store')
    except Exception:
        pass

    try:
        os.removedirs(dirname)
    except Exception:
        pass


os.rename('bigtree_app_frontend/', APP_NAME + '_frontend/')

os.rename('bigtree_app.code-workspace', APP_NAME + '.code-workspace')


print("Done!")
