// import styled from 'styled-components'
import DubRehearsal from './containers/DubRehearsal'
import FrameBody from '@components/FrameBody'
import BtnBackTitle from '@components/BtnBackTitle'
import DubStudio from './containers/DubStudio'

export default function Dubbing() {
  return (
    <FrameBody bgColor="#3B75FF">
      <BtnBackTitle title="Alligator's Apples" />
      {/* <DubRehearsal /> */}
      <DubStudio />
    </FrameBody>
  )
}
