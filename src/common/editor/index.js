import React, { Component, createRef } from 'react'

import E from 'wangeditor'

export default class editor extends Component {
    constructor() {
        super()
        this.box = createRef()
    }
    componentDidMount () {
        this.editor = new E(this.box.current)
        this.editor.customConfig.onchange = html => {
            console.log(html)
            this.props.getAdd(html)
            // console.log(this.props)
        }
        this.editor.create()
    }

    render() {
        return (
            <div ref={this.box}></div>
        )
    }
}
