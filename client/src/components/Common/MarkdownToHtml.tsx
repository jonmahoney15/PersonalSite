import ReactMarkDown from 'react-markdown';
import gfm from 'remark-gfm';

interface IProps {
    content: string;
    class?: string;
}

const MarkdownToHTML = (props: IProps) => {
    return (
        <ReactMarkDown className="w-full prose" children={props.content} remarkPlugins={[gfm]}/>
    );
}

export default MarkdownToHTML;
