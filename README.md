# electron_project-convert_format
You can change the character format.

![スクリーンショット 2022-09-20 115803](https://user-images.githubusercontent.com/56500993/191161500-77b69a13-e465-4889-b9cd-05c07ae98b7b.jpg)

## Building

You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app.

```bash
$ git clone https://github.com/sunaga104/electron_project-convert_format.git
$ cd electron_project-convert_format
$ npm install
$ npm run start
```

If you want to create an .exe or .app file, run the command

```bash
$ npm run npm run build-macOS
# or
$ npm run npm run build-windows
```

## How to use

1, Case1

Input the string you want to convert case.

You can convert lowercase to uppercase or uppercase to lowercase.

![スクリーンショット 2022-09-20 115902](https://user-images.githubusercontent.com/56500993/191161643-cfcf0348-5539-4f90-a848-789d82921dbb.jpg)

1, Case2

Input the string you want to convert format.

You can change how characters are displayed.

![スクリーンショット 2022-09-20 120027](https://user-images.githubusercontent.com/56500993/191162188-c50bee9c-fdc1-470c-a9fb-08f88f712db1.jpg)

|  case  |  Description  |
| ---- | ---- |
| space separated  | Connect words using single-byte spaces as separators. |
|  camelCase  | Begin compound words with a lowercase letter.  |
|  PascalCase  |  Begin a compound word with a capital letter.  |
|  snake_case  |  Connect words using underscores (_) as separators.  |
|  kebab-case  |  Hyphens (-) are used as separators to join words.  |



*An error will occur if the cases are not the same

![スクリーンショット 2022-09-20 115930](https://user-images.githubusercontent.com/56500993/191162100-fb57c7aa-ddd8-4c3b-9790-31d052494256.jpg)


## Reference Site

https://lazesoftware.com/tool/casestyle/


