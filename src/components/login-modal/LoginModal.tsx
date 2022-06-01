import React, { useCallback, useContext, useState } from 'react'
import { Modal, Input } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '@/store/hooks'
import { setProfile } from '@/store/features/users/usersSlice'
import { userDetail } from '@/commons/api'
import { LoadingContext } from '@/commons/context'

interface Props {
  visible: boolean,
  setVisible: (arg0: boolean) => void
}

const LoginModal: React.FC<Props> = ({ visible, setVisible }) => {
  // input
  const [inputValue, setInputValue] = useState('')
  const inputChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setInputValue(value)
  }, [])

  const dispatch = useAppDispatch()
  const loadingContext = useContext(LoadingContext)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const path = searchParams.get('path')

  const handleOk = async () => {
    loadingContext.toggleLoading(true)
    const res = await userDetail({
      uid: inputValue
    })
    loadingContext.toggleLoading(false)
    if (res.code === 200) {
      setVisible(false)
      dispatch(setProfile(res.profile))
      if (path) {
        navigate(path, { replace: true })
      }
    }
  }

  const handleCancel = () => {
    setInputValue('')
    setVisible(false)
  }

  return (
    <Modal title="登录" visible={visible} onOk={handleOk} onCancel={handleCancel}
      transitionName="" maskTransitionName="">
      <Input placeholder="网易云音乐用户id" value={inputValue} onChange={inputChange} />
      {/* <Button type="primary" onClick={sureHandle} style={{margin: '10px auto'}}>
          确定
        </Button> */}
    </Modal>
  )
}

export default LoginModal
