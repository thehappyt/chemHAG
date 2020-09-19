function GradCyl(args) { GraduatedCylinder(args) };
function GraduatedCylinder(args) {
  if (!(this instanceof GraduatedCylinder)) return new GraduatedCylinder(args)
  args = args || {};
  var cylH = args.height = args.height || 20;
  var cylR = args.radius = args.radius || 1;
  var maxV = args.volume = args.volume || 100;
  var stpN = args.major = args.major || 10;
  var stpL = args.minor = args.minor || 5;
  var thkL = Math.max(0.05,cylH*stpL/maxV/20);
  var txtH = args.fontSize = args.fontSize || 0.2*cylH*stpN/maxV;
  var base = args.base = (args.base==undefined?true:!!args.base);
  
  scene.background=color.white
  var cyl = [];
  cyl.push( extrusion({pos:vec(0,0.555*cylH,0), path:paths.circle({radius:cylR+0.5*thkL}), shape:shapes.rectangle({width:thkL, height:1.09*cylH, roundness:thkL/4, pos:[-thkL/2,0]}), color:color.white, opacity:0.05}) )
  for (let i=2*stpL; i<maxV+1; i+=stpL) {
    let N=(i%stpN==0), an1=pi/8, an2=pi/4, an3=3*pi/16, n1=(1+Math.cos(an1))/2, n2=(1+Math.cos(an2))/2, hi=cylH*i/maxV, ax=vec(0,1,0);
    if (N) {
      cyl.push( extrusion({pos:vec(cylR*n2+thkL,hi-thkL,0), path:paths.arc({radius:cylR, angle1:-an2, angle2:an2}), shape:shapes.rectangle({width:thkL, height:thkL}), color:color.black}) )
      cyl.push( text({text:i, align:'center', height:txtH, color:color.black, pos:vec(cylR,hi,0).rotate({angle:an3, axis:ax}), axis:vec(0,0,-1).rotate({angle:an3, axis:ax}) }) )
    } else {
      cyl.push( extrusion({pos:vec(cylR*n1+thkL,hi-thkL,0), path:paths.arc({radius:cylR, angle1:-an1, angle2:an1}), shape:shapes.rectangle({width:thkL, height:thkL}), color:color.black}) )
    }
  }
  if (base) {
    let h=cylH*stpL/maxV;
    cyl.push( extrusion({ pos:vec(0,h/2,0),    color:color.yellow, path:paths.circle({ radius:cylR-0.5*thkL }), shape:shapes.rectangle({ width:thkL,   height:h,    pos:[-0.5*thkL,0] }) }) )
    cyl.push( extrusion({ pos:vec(0,h/2,0),    color:color.yellow, path:paths.circle({ radius:cylR+1.5*thkL }), shape:shapes.rectangle({ width:thkL,   height:h,    pos:[-0.5*thkL,0] }) }) )
    cyl.push( extrusion({ pos:vec(0,thkL/2,0), color:color.yellow, path:paths.circle({ radius:2*cylR }),        shape:shapes.rectangle({ width:2*cylR, height:thkL, pos:[-cylR,0] }) }) )
    cyl.push( extrusion({ pos:vec(0,h/2,0),    color:color.yellow, path:paths.circle({ radius:cylR }),          shape:shapes.arc({ radius:cylR, angle1:pi, angle2:3*pi/2, thickness:0.05, pos:[cylR,0] }) }) )
  }
  cyl = compound(cyl, { origin:vec(0,0,0) })
  cyl.rotate({ angle:-pi/2, axis:vec(0,1,0), origin:vec(0,0,0) })
  //cyl.pos = vec(-10,0,0)
  //maxH=0.9*cylH
  //cyl.fluid = cylinder(pos=vec(0,-cylH/2,0), axis=vec(0,0.4*maxH,0), radius=cylR, opacity=0.5, color=(color.blue+color.gray(1.0))/2)
  
  /*
  Object.defineProperty(this, "fluid", { value: cylinder(), configurable: false, enumerable: false, writable: false })
  Object.defineProperty(this, "lbl", { configurable: false, enumerable: false, writable: false, value: label({ text: 'X', color: vec(0,1,0), height: 6, font: 'Verdana', box: false, line: false, opacity: 0, visible: true }) })
  Object.defineProperty(this, "efv", { configurable: false, enumerable: false, writable: false, value: arrow({ axis_and_length: vec(0,0,0), shaftwidth:shaft, color:vec(0,0,0), pickable:false, visible: true }) })
  Object.defineProperty(this, "__pos", {value: vec(0,0,0), enumerable: false, configurable: false, writable: true})
  Object.defineProperty(this, "pos", {
    get: function() {return this.__pos;},
    set: function(val) {
      if (!(val instanceof vec)) throw new Error("GraduatedCylinder 'pos' attribute must be a vec.");
      var pos = this.__pos = val;
      this.fluid.pos = pos;
      this.cylinder.pos = pos;
    }
  })
  for(var id in args) this[id] = args[id]
  */
}
