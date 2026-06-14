import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Force all Quill links to open in a new tab
const QuillLink = Quill.import('formats/link') as any;
class NewTabLink extends QuillLink {
  static create(value: string) {
    const node = super.create(value);
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
    return node;
  }
}
Quill.register(NewTabLink, true);

export default ReactQuill;
