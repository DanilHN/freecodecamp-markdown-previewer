const defaultInput = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n";

/**marked library */
marked.setOptions({
    breaks: true
})
const renderer = new marked.Renderer();

/**jQuery */

$(document).ready(function () {
    const buttonEditorHide = document.getElementById('hide-editor');
    const buttonEditorShow = document.getElementById('show-editor');
    const buttonPreviewHide = document.getElementById('hide-previewer');
    const buttonPreviewShow = document.getElementById('show-previewer');
    const preview = document.getElementById('preview')

    const editor = document.getElementById('editor-container');
    const previewContainer = document.getElementById('previewer-container');

    buttonEditorHide.addEventListener('click', () => {
        buttonEditorHide.style.display = "none";
        editor.style.height = '30vh';
        buttonEditorShow.style.display = "block";
    })
    buttonEditorShow.addEventListener('click', () => {
        editor.style.height = '100vh';
        buttonEditorHide.style.display = 'block';
        buttonEditorShow.style.display = 'none';
    })

    buttonPreviewHide.addEventListener('click', () => {
        buttonPreviewHide.style.display = 'none';
        preview.style.overflow = 'scroll';
        previewContainer.style.height = '30vh';

        buttonPreviewShow.style.display = 'block';
    })

    buttonPreviewShow.addEventListener('click', () => {
        buttonPreviewShow.style.display = 'none';
        previewContainer.style.height = '100vh';
        preview.style.overflow = 'auto';
        buttonPreviewHide.style.display = 'block';
    })


})
/**React */
class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: defaultInput
        };
    };
    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }
    render() {
        return (
            <div>
                <div className="text-center"><h1 id="title">Markdown Previewer</h1></div>
                <div className="row position-relative justify-content-evenly">

                    <div id="hide-show-editor" className='col-5 bg-light'>
                        <div className="row justify-content-end" >
                            <button id="hide-editor" className="btn p-0 col-1 visible bg-light">
                                <i className="fa-solid fa-down-left-and-up-right-to-center"></i>
                            </button>
                            <button id="show-editor" className="btn  p-0 col-1 visible bg-light">
                                <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                            </button>
                        </div>
                    </div>


                    <div id="hide-show-previewer" className='col-5 bg-light'>
                        <div className="row justify-content-end">
                            <button id="hide-previewer" className="btn p-0 col-1 visible bg-light">
                                <i className="fa-solid fa-down-left-and-up-right-to-center"></i>
                            </button>
                            <button id="show-previewer" className="btn p-0 col-1 visible bg-light">
                                <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                            </button>
                        </div>
                    </div>
                </div>


                <div className="row mt-0 justify-content-evenly">

                    <div id="editor-container" className="col-5 p-3 g-3 mt-0 bg-light">
                        <textarea id="editor" className='w-100  bg-light' onChange={this.handleChange} value={this.state.input}></textarea>
                    </div>

                    <div id='previewer-container' className="col-5 p-3  g-3 mt-0 bg-light">
                        <div
                            id="preview"
                            className="w-100  bg-light"

                            dangerouslySetInnerHTML={{
                                __html: marked.parse(this.state.input, { renderer: renderer }),
                            }}>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}




ReactDOM.render(<MyApp />, document.getElementById('app'))