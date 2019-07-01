var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
};
var scene,
	camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
    renderer, container;

function handleWindowResize() {
	// cập nhật lại kích thước của renderer và camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

function createScene() {
	// Lấy ra width và height của màn hình,
	// dùng để cài đặt tỉ lệ khung hình (aspect ratio) cho camera
	// và size của renderer.
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	// Tạo scene
	scene = new THREE.Scene();

	// Thêm hiệu ứng sương mù vào scene, cùng màu với
	// màu nền đã style trước đó
	scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

	// Tạo camera
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 60;
	nearPlane = 1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
	);

	// Đặt vị trí cho camera
	camera.position.x = 0;
	camera.position.z = 200;
	camera.position.y = 100;

	// Tạo renderer
	renderer = new THREE.WebGLRenderer({
		// Cho phép trong suốt để hiển thị màu nền
		// đã định nghĩa trong CSS
		alpha: true,

		// Bật khử răng cưa; hiệu năng sẽ giảm
		// nhưng sẽ ổn thôi vì project này ít đối tượng
		antialias: true
	});

	// Xác định kích cỡ của renderer; trong trường hợp này,
	// là full toàn màn hình
	renderer.setSize(WIDTH, HEIGHT);

	// Cho phép render bóng đổ
	renderer.shadowMap.enabled = true;

	// Thêm DOM của renderer vào
	// container ta đã tạo trong HTML
	container = document.getElementById('world');
	container.appendChild(renderer.domElement);

	// Nếu người dùng resize trình duyệt
	// cần cập nhật lại camera và size của renderer
	window.addEventListener('resize', handleWindowResize, false);
}    

var hemisphereLight, shadowLight;

function createLights() {
	// Nguồn sáng bán cầu là loại có màu tô chuyển (gradient)
	// tham số đầu tiên là màu trời, thứ 2 là màu đất,
	// thứ 3 là cường độ ánh sáng
	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

	// Nguồn sáng có hướng tỏa ra từ 1 vị trí nhất định
	// Nó giống như mặt trời, nghĩa là các tia được tạo ra song song với nhau.
	shadowLight = new THREE.DirectionalLight(0xffffff, .9);

	// Đặt vị trí cho nguồn sáng
	shadowLight.position.set(150, 350, 350);

	// Cho phép phủ bóng
	shadowLight.castShadow = true;

	// cài đặt vùng nhìn thấy của bóng đổ
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// cài đặt độ phân giải của bóng đổ; càng cao càng đẹp,
	// nhưng cũng càng nặng nề hơn
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	// thêm vào scene để kích hoạt
	scene.add(hemisphereLight);
	scene.add(shadowLight);
}

// Định nghĩa đối tượng Sea
Sea = function(){

	// tạo khối hình trụ
	// các tham số:
	// bán kính mặt trên, bán kính mặt đáy, chiều cao, số lượng phân khúc trên bán kính, số lượng phân khúc theo chiều dọc
	var geom = new THREE.CylinderGeometry(600,600,800,40,10);

	// xoay trên trục X
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

	// tạo chất liệu
	var mat = new THREE.MeshPhongMaterial({
		color:Colors.blue,
		transparent:true,
		opacity:.6,
		shading:THREE.FlatShading,
	});

	// Để tạo một đối tượng trong Three.js, ta phải tạo ra một lưới (mesh)
	// là sự kết hợp của một hình khối và chất liệu
	this.mesh = new THREE.Mesh(geom, mat);

	// Cho phép bóng đổ trên biển
	this.mesh.receiveShadow = true;
}

// Khởi tạo và thêm vào scene

var sea;

function createSea(){
	sea = new Sea();

	// đặt vị trí phía dưới scene
	sea.mesh.position.y = -600;

	// thêm lưới này vào scene
	scene.add(sea.mesh);
}

Cloud = function(){
	// Tạo một container rỗng để chứa các phần của đám mây
	this.mesh = new THREE.Object3D();

	// tạo khối lập phương;
	// khối này sẽ được nhân ra để tạo ra các đám mây
	var geom = new THREE.BoxGeometry(20,20,20);

	// tạo chất liệu; chất liệu màu trắng là đủ
	var mat = new THREE.MeshPhongMaterial({
		color:Colors.white,
	});

	// nhân hình khối lên một số ngẫu nhiên lần
	var nBlocs = 3+Math.floor(Math.random()*3);
	for (var i=0; i<nBlocs; i++ ){

		// tạo lưới từ hình khối
		var m = new THREE.Mesh(geom, mat);

		// đặt vị trí và góc quay của mỗi khối ngẫu nhiên
		m.position.x = i*15;
		m.position.y = Math.random()*10;
		m.position.z = Math.random()*10;
		m.rotation.z = Math.random()*Math.PI*2;
		m.rotation.y = Math.random()*Math.PI*2;

		// đặt kích thước của khối ngẫu nhiên
		var s = .1 + Math.random()*.9;
		m.scale.set(s,s,s);

		// cho phép mỗi khối phủ và nhận bóng đổ
		m.castShadow = true;
		m.receiveShadow = true;

		// thêm khối vào container
		this.mesh.add(m);
	}
}

// Định nghĩa đối tượng Sky
Sky = function(){
	// Tạo container rỗng
	this.mesh = new THREE.Object3D();

	// chọn số  lượng đám mây rải rác trên bầu trời
	this.nClouds = 20;

	// Để phân phối các đám mây một cách nhất quán,
	// chúng ta phải đặt chúng theo một góc thống nhất
	var stepAngle = Math.PI*2 / this.nClouds;

	// tạo các đám mây
	for(var i=0; i<this.nClouds; i++){
		var c = new Cloud();

		// đặt góc xoay và vị trí của mỗi đám mây;
		// chúng ta sẽ dùng chút lượng giác
		var a = stepAngle*i; // đây là góc của đám mây
		var h = 750 + Math.random()*200; // đây là khoảng cách giữa trung điểm của trục và đám mây

		// Lượng giác!!! Hi vọng bạn vẫn còn nhớ chút Toán học :)
		// nếu không thì:
		// đơn giản là chuyển đổi tọa độ cực (góc, khoảng cách) sang tọa độ Descartes (x, y)
		c.mesh.position.y = Math.sin(a)*h;
		c.mesh.position.x = Math.cos(a)*h;

		// xoay đám mây theo vị trí của nó
		c.mesh.rotation.z = a + Math.PI/2;

		// để kết quả tốt hơn, ta đặt các đám mây
		// ở độ sâu ngẫu nhiên trong scene
		c.mesh.position.z = -400-Math.random()*400;

		// và cả độ phóng ngẫu nhiên cho mỗi đám mây
		var s = 1+Math.random()*2;
		c.mesh.scale.set(s,s,s);

		// đừng quên thêm lưới vào container
		this.mesh.add(c.mesh);
	}
}

// Bây giờ ta khởi tạo bầu trời và đẩy tâm của nó
// về phía dưới màn hình một chút

var sky;

function createSky(){
	sky = new Sky();
	sky.mesh.position.y = -600;
	scene.add(sky.mesh);
}

var AirPlane = function() {

	this.mesh = new THREE.Object3D();

	// Tạo cabin
	var geomCockpit = new THREE.BoxGeometry(60,50,50,1,1,1);
	var matCockpit = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);

	// Tạo động cơ
	var geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
	var matEngine = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
	var engine = new THREE.Mesh(geomEngine, matEngine);
	engine.position.x = 40;
	engine.castShadow = true;
	engine.receiveShadow = true;
	this.mesh.add(engine);

	// Tạo đuôi
	var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
	var matTailPlane = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
	tailPlane.position.set(-35,25,0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	this.mesh.add(tailPlane);

	// Tạo cánh
	var geomSideWing = new THREE.BoxGeometry(40,8,150,1,1,1);
	var matSideWing = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
	sideWing.castShadow = true;
	sideWing.receiveShadow = true;
	this.mesh.add(sideWing);

	// phần quạt
	var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
	var matPropeller = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
	this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
	this.propeller.castShadow = true;
	this.propeller.receiveShadow = true;

	// cánh quạt
	var geomBlade = new THREE.BoxGeometry(1,100,20,1,1,1);
	var matBlade = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});

	var blade = new THREE.Mesh(geomBlade, matBlade);
	blade.position.set(8,0,0);
	blade.castShadow = true;
	blade.receiveShadow = true;
	this.propeller.add(blade);
	this.propeller.position.set(50,0,0);
	this.mesh.add(this.propeller);
};

var airplane;

function createPlane(){
	airplane = new AirPlane();
	airplane.mesh.scale.set(.25,.25,.25);
	airplane.mesh.position.y = 100;
	scene.add(airplane.mesh);
}

function loop(){
	// Xoay biển và bầu trời
	sea.mesh.rotation.z += .005;
	sky.mesh.rotation.z += .01;

    // cập nhật máy bay trong mỗi khung hình
    updatePlane();
    
	// render the scene
	renderer.render(scene, camera);
	// gọi hàm lặp lại
	requestAnimationFrame(loop);
}

function updatePlane(){
	// di chuyển máy bay trong khoảng -100 tới 100 trên trục ngang,
	// và từ 25 đến 175 trên trục dọc,
	// tùy thuộc vào vị trí chuột trong khoảng từ -1 đến 1 trên cả hai trục;
	// để làm điều đó chúng ta sử dụng một hàm chuẩn hoá (bên dưới)

	var targetX = normalize(mousePos.x, -1, 1, -100, 100);
	var targetY = normalize(mousePos.y, -1, 1, 25, 175);

	// cập nhật vị trí máy bay
	airplane.mesh.position.y = targetY;
	airplane.mesh.position.x = targetX;
	airplane.propeller.rotation.x += 0.3;
}

function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}

var mousePos={x:0, y:0};

// xử lý sự kiện mousemove

function handleMouseMove(event) {
	// ở đây chúng ta đang chuyển đổi giá trị vị trí chuột nhận được
	// đến một giá trị chuẩn hoá giữa -1 và 1;
	// đây là công thức cho trục ngang:
	var tx = -1 + (event.clientX / WIDTH)*2;

	// với trục dọc, chúng ta cần phải đảo ngược công thức
	// vì trục tung 2D đi theo hướng ngược lại trục tung 3D
	var ty = 1 - (event.clientY / HEIGHT)*2;
	mousePos = {x:tx, y:ty};

}

function init() {
	// cài đặt scene, camera, và renderer
	createScene();

	// thêm ánh sáng
	createLights();

	// thêm các đối tượng
	createPlane();
	createSea();
    createSky();
    
    document.addEventListener('mousemove', handleMouseMove, false);

	// bắt đầu vòng lặp cập nhật vị trí các đối tượng
	// và render scene trong mỗi khung hình
	loop();
}

window.addEventListener('load', init, false);