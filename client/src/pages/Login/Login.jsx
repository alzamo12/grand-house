import { Link, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { useForm } from "react-hook-form"
import LoadingSpinner from '../../components/shared/LoadingSpinner/LoadingSpinner'
import Swal from 'sweetalert2'


const Login = () => {

  const { signIn, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        navigate('/')
        Swal.fire({
          title: "You've Login Successfully to your account",
          icon: "success",
          draggable: true
        });
      })
      .catch(error => console.log(error))
  };

  const handleSocialLogin = () => {
    signInWithGoogle()
      .then(result => {
        console.log(result.user)
      })
      .catch(error => {
        console.log(error)
      })
  };

  if (loading) return <LoadingSpinner />

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <title>Grand House &nbsp;| |&nbsp; Login</title>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='space-y-4'>
            {/* email */}
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                {...register("email", { required: true })}
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
              {/* email error0 */}
              {errors.email && <span className='text-red-600 text-xs'>This field is required</span>}
            </div>
            {/* password */}
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                {...register("password", { required: true })}
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
              {/* password error */}
              {errors.password && <span className='text-red-600 text-xs'>This field is required</span>}

            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white cursor-pointer'
            >
              Continue
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div onClick={handleSocialLogin} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
