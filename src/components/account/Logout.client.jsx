import {useCallback} from 'react'

function Logout(props) {
  const logout = useCallback(()=>{
      fetch('/account/logout',{method:'POST'}).then(()=>window.location.href = '/account/login')
  },[])
  return (
    <button {...props} onClick={logout}>
      Logout
    </button>
  )
}

export default Logout