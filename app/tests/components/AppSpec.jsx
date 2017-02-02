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
    expect(wrapper.find('div').hasClass('jumbotron')).to.equal(true);
    expect(wrapper.find('div > h1')).to.have.length(1);
    expect(wrapper.containsMatchingElement(<h1>Hello ye world!<i className="fa fa-ravelry" aria-hidden="true" /></h1>)).to.equal(true);
    expect(wrapper.find('div p')).to.have.length(2);
    expect(wrapper.containsMatchingElement(<p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>)).to.equal(true);
  });
});
