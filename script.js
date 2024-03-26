function init(){
    gsap.registerPlugin(ScrollTrigger);
  
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
  
init();


function parentChildSpan(){
    document.querySelectorAll(".reveal").forEach(function(elem){
        let spanparent =document.createElement("span");
        let spanchild =document.createElement("span");
    
        spanparent.classList.add("parent");
        spanchild.classList.add("child");
    
        spanchild.textContent=elem.textContent;
    
        spanparent.appendChild(spanchild);
    
        elem.innerHTML="";
        elem.appendChild(spanparent);
    })
}
parentChildSpan();

function outerInnerSpan(){
    document.querySelectorAll(".cover").forEach(function(elem){
        let spanparent =document.createElement("span");
        let spanchild =document.createElement("span");
    
        spanparent.classList.add("outer");
        spanchild.classList.add("inner");
    
        spanchild.textContent=elem.textContent;
    
        spanparent.appendChild(spanchild);
    
        elem.innerHTML="";
        elem.appendChild(spanparent);
    })
}
outerInnerSpan();


gsap.to(".parent .child",{
    y:"0%",
    duration:2,
    stagger:.1,
    ease: Expo.easeInOut
})

gsap.to(".outer .inner",{
    y:"0%",
    delay:1,
    duration:2,
    stagger:.1,
    ease: Expo.easeInOut
})

gsap.from(".other",{
    delay:1.2,
    duration:2,
    opacity:0,
    ease: Expo.easeInOut
})

document.querySelectorAll(".h3").forEach(function(text){
    text.addEventListener("mouseenter",function(dets){
        console.log(dets)
        gsap.to(dets.target.children[1],{
            width:"100%",
            ease:Expo.easeInOut,
            duration:.5
        })
    })
    text.addEventListener("mouseleave",function(dets){
        gsap.to(dets.target.children[1],{
            width:"0%",
            left:"100%",
            ease:Expo.easeInOut,
            duration:.5,
            onComplete: function(){
                dets.target.children[1].style.left="0";
            }
        })
    })
})



document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});



gsap.from("#section2",{
    scrollTrigger:{
        scroller:"#main",
        trigger:"#section2",
        start: "top 80%",
        // markers: true
    },
    y:60,
    opacity:0,
    stagger:.3,
    ease: Expo.easeInOut,
    duration:1
})


gsap.from("#section3 #about #details",{
    scrollTrigger:{
        scroller:"#main",
        trigger:"#section3",
        start: "top 80%",
        // markers: true
    },
    opacity:0,
    stagger:.3,
    ease: Expo.easeInOut,
    duration:1
})



window.addEventListener("mousemove",function(dets){
    console.log(dets)
    document.querySelector("#cursor").style.top=`${dets.y-15}px`;
    document.querySelector("#cursor").style.left=`${dets.x-15}px`
})