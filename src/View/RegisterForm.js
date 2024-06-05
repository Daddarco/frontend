export default function RegisterForm({register, message}) {

  return (
    <form autoComplete='off' className='form' onSubmit={register}>
      <label htmlFor='username' className='block'>Username</label>
      <input type='text' id='username' name='username' className='block'></input>

      <label htmlFor='email' className='block'>Email</label>
      <input type='email' id='email' name='email' className='block mb-2'></input>

      <label htmlFor='password' className='block'>Password</label>
      <input type='password' id='password' name='password' className='block'></input>
      
      <button type='submit' className='block'>Registra nuovo responsabile</button>
      <div>{message}</div>
    </form>
  )
}