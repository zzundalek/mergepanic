((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,E,F,B={
tW(d){var x,w,v=d.CW
if(v==null)x=null
else{v=v.d$
v.toString
x=v}while(x instanceof A.an){w=x.gM()
v=w instanceof $.mw()
if(v)return w
x=x.a}return null},
tX(d,e){var x,w
if(e!=null){x=A.h(A.h(b.G.document).createRange())
x.selectNodeContents(e)
return A.fP(A.h(A.h(x.createContextualFragment(d)).childNodes))}w=A.h(A.h(b.G.document).createElement("template"))
w.innerHTML=d
return A.fP(A.h(A.h(w.content).childNodes))},
fZ:function fZ(d,e){this.c=d
this.a=e},
eD:function eD(d,e){this.b=d
this.a=e},
hZ:function hZ(d,e,f,g,h,i){var _=this
_.d$=d
_.e$=e
_.f$=f
_.c=_.b=_.a=null
_.d=g
_.e=null
_.f=h
_.w=_.r=null
_.x=i
_.Q=_.z=_.y=null
_.as=!1
_.at=!0
_.ax=!1
_.CW=null
_.cx=!1},
hM:function hM(d){var _=this
_.d=d
_.c=_.b=_.a=null},
fG:function fG(){},
ea:function ea(d,e){this.a=d
this.$ti=e},
rd(){return new B.cj(null)},
cj:function cj(d){this.a=d},
k3:function k3(){},
k4:function k4(d){this.a=d}},C,D,G,H
J=c[1]
A=c[0]
E=c[2]
F=c[12]
B=a.updateHolder(c[6],B)
C=c[24]
D=c[15]
G=c[18]
H=c[20]
B.fZ.prototype={
I(d){var x,w,v,u,t=A.f([],y.p)
for(x=B.tX(this.c,B.tW(d)),w=x.$ti,x=new A.bH(x.a(),w.h("bH<1>")),v=y.g,w=w.c;x.n();){u=x.b
if(u==null)u=w.a(u)
t.push(new B.eD(u,new B.ea(u,v)))}return new D.cc(t,null)}}
B.eD.prototype={
aa(){var x=($.X+1)%16777215
$.X=x
return new B.hZ(null,!1,!1,x,this,E.f)}}
B.hZ.prototype={
gt(){return y.k.a(A.m.prototype.gt.call(this))},
ab(d){this.eR(y.k.a(d))},
ai(){var x,w=this.CW.d$
w.toString
x=new B.hM(y.k.a(A.m.prototype.gt.call(this)).b)
x.a=w
return x},
ac(d){}}
B.hM.prototype={
aq(d,e){throw A.a(A.K("Raw nodes cannot have children attached to them."))},
F(d,e){throw A.a(A.K("Text nodes cannot have children removed from them."))},
aj(){},
c0(d){y.b.a(d)
return null},
gM(){return this.d}}
B.fG.prototype={}
B.ea.prototype={
G(d,e){if(e==null)return!1
return J.my(e)===A.aJ(this)&&this.$ti.b(e)&&e.a===this.a},
gC(d){return A.nO([A.aJ(this),this.a])},
j(d){var x=this.$ti,w=x.c,v=this.a,u=A.aq(w)===C.aO?"<'"+A.n(v)+"'>":"<"+A.n(v)+">"
if(A.aJ(this)===A.aq(x))return"["+u+"]"
return"["+A.aq(w).j(0)+" "+u+"]"}}
B.cj.prototype={
I(d){var x=null,w=y.p,v=A.f([],w)
v.push(G.m0(A.f([new B.fZ('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>\n',x)],w),x,"sidebar-toggle-button",x,new B.k3(),x))
return new D.cc(v,x)}}
var z=a.updateTypes([])
B.k3.prototype={
$0(){var x,w,v,u,t,s,r={}
r.a=r.b=null
x=new B.k4(r)
w=b.G
v=A.y(A.h(A.h(w.window).document).querySelector(".sidebar-close"))
if(v==null)u=null
else{t=y.f
u=A.ep(v,"click",t.h("~(1)?").a(x),!1,t.c)}r.b=u
v=A.y(A.h(A.h(w.window).document).querySelector(".sidebar-barrier"))
if(v==null)s=null
else{t=y.f
s=A.ep(v,"click",t.h("~(1)?").a(x),!1,t.c)}r.a=s
r=A.y(A.h(A.h(w.window).document).querySelector(".sidebar-container"))
if(r!=null)A.h(r.classList).add("open")},
$S:0}
B.k4.prototype={
$1(d){var x=this.a,w=x.b
if(w!=null)w.ar()
x=x.a
if(x!=null)x.ar()
x=A.y(A.h(A.h(b.G.window).document).querySelector(".sidebar-container"))
if(x!=null)A.h(x.classList).remove("open")},
$S:59};(function inheritance(){var x=a.inheritMany,w=a.inherit
x(H.E,[B.fZ,B.cj])
w(B.eD,A.l)
w(B.hZ,A.ce)
w(B.hM,A.an)
w(B.fG,F.aZ)
w(B.ea,B.fG)
w(B.k3,A.aW)
w(B.k4,A.a3)})()
A.ao(b.typeUniverse,JSON.parse('{"fZ":{"E":[],"l":[]},"eD":{"l":[]},"hZ":{"aj":[],"m":[],"a2":[]},"hM":{"an":[],"bS":[]},"fG":{"aZ":[]},"ea":{"aZ":[]},"cj":{"E":[],"l":[]}}'))
var y={p:A.r("t<l>"),g:A.r("ea<p>"),f:A.r("el<p>"),k:A.r("eD"),b:A.r("L(p)")};(function constants(){C.aO=A.as("b")})()};
(a=>{a["dJK7mdiq61iO9B+pTO8XW0S72Mw="]=a.current})($__dart_deferred_initializers__);
//# sourceMappingURL=main.client.dart.js_16.part.js.map
