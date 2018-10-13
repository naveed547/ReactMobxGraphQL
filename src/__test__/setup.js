import jsdom from 'jsdom';  
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
const {JSDOM} = jsdom;  
const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;  
global.document = document;  
global.window = document.defaultView;