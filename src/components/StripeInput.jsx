import { forwardRef, useImperativeHandle, useRef } from "react"

export const StripeInput = forwardRef(function StripeInput({component: Component, ...props},ref){

    const elementRef = useRef();

    useImperativeHandle(ref, () => ({
        focus: () => elementRef.current.focus
    }))

    return(
        <Component 
            {...props}
            onReady = {(element => elementRef.current = element)}
        />

    )
})