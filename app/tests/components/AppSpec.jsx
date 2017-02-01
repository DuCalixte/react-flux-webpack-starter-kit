import App from 'components/App';
import { shallow } from 'enzyme';

describe('App component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  var init = function() {
    wrapper = shallow(<App />);
  };

  it('renders', () =>{
    // console.debug('wrapper', wrapper);
    console.debug('wrapper', wrapper.debug());
    console.debug('wrapper', wrapper.html());
    console.debug('wrapper');
  });
});
