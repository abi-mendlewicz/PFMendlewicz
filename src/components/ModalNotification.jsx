import { CgCheckO, CgDanger, CgCloseO } from 'react-icons/cg'

export default function ModalNotification({type, title, content, setShowModal}) {
  return (
    <>
      <div
        className='modal-back'
        onClick={() => setShowModal(false)}
      ></div>
      <div className='modal-note-container'>
        <div className='relative transform overflow-hidden bg-white text-left shadow-xl transition-all'>
          <div className='relative bg-white'>
            <div className={`sticky top-0 flex justify-between p-4 ${type == 'error' ? 'bg-red-400' : type == 'success' && 'bg-green-200'}`}>
              <h3 className='flex items-center text-2xl font-semibold' id='modal-title'>
                {type == 'success' && <CgCheckO className='inline-block me-4' size={32} />}
                {type == 'error' && <CgDanger className='inline-block me-4' size={32} />}
                {title}
              </h3>
              <CgCloseO
                className='ms-4 cursor-pointer'
                size={32}
                onClick={() => setShowModal(false)}
              />
            </div>
            <div className='py-4 px-6'>
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}