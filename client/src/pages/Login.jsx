import { Link, Form, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/auth/login', data);
      queryClient.invalidateQueries();
      toast.success('Welcome back!');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Login = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <div className='logo-container'>
          <Logo />
          <h4>Welcome Back</h4>
          <p className='subtitle'>Sign in to your application dashboard</p>
        </div>
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <SubmitBtn />
        <p className='member-row'>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Create account
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
