import React from 'react'

const SectionContainer = ( { children, extraStyles} ) => {
  return (
    <section id='actions-section' className={'w-full flex flex-col border border-gray-200 text-xl bg-white rounded-xl mt-12 p-6 gap-6 shadow-xl ' + extraStyles || ''}>
      {children}
    </section>
  )
}

export default SectionContainer
