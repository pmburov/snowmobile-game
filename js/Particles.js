// var Particle3D;

var sprites = [
    new THREE.TextureLoader().load( 'img/sprites/snowflake1.png' ),
    new THREE.TextureLoader().load( 'img/sprites/snowflake2.png' ),
    new THREE.TextureLoader().load( 'img/sprites/snowflake4.png' ),
    new THREE.TextureLoader().load( 'img/sprites/snowflake5.png' )
];

var TO_RADIANS = Math.PI / 180;
var spriteMap = new THREE.TextureLoader().load( 'textures/particle.png' );
var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );

Particle3D = function(material) {
    // spriteMaterial.map = sprites[ parseInt(randomRange(0,4)) ];
    THREE.Sprite.call(this, spriteMaterial);

    // this = new THREE.Sprite( spriteMaterial );
    //this.material = material instanceof Array ? material : [ material ];
    // define properties
    this.velocity = new THREE.Vector3(0, -0.6, -0.05);
    this.velocity.rotateX(randomRange(-15, 15));
    this.velocity.rotateY(randomRange(0, 360));
    this.gravity = new THREE.Vector3(0, 0, 0);
    this.drag = 1;
    // methods... 
};

Particle3D.prototype = new THREE.Sprite();
Particle3D.prototype.constructor = Particle3D;

Particle3D.prototype.updatePhysics = function() {
    this.velocity.multiplyScalar(this.drag);
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
}

THREE.Vector3.prototype.rotateY = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempz = this.z;;
    var tempx = this.x;

    this.x = (tempx * cosRY) + (tempz * sinRY);
    this.z = (tempx * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateX = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempz = this.z;;
    var tempy = this.y;

    this.y = (tempy * cosRY) + (tempz * sinRY);
    this.z = (tempy * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateZ = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempx = this.x;;
    var tempy = this.y;

    this.y = (tempy * cosRY) + (tempx * sinRY);
    this.x = (tempy * -sinRY) + (tempx * cosRY);
}

// returns a random number between the two limits provided 

function randomRange(min, max) {
    return ((Math.random() * (max - min)) + min);
}

var magicNumber1 = 70; //200
var magicNumber2 = 20; //100

var particle;
var particles = []; 

Particle3D.total = 500;

Particle3D.particlesGroup = new THREE.Group();

function generateParticles(scene) {
    
    for (var i = 0; i < Particle3D.total; i++) {

        particle = new Particle3D();
        particle.position.x = Math.random() * magicNumber1 - magicNumber2;
        particle.position.y = Math.random() * magicNumber1 - magicNumber2;
        particle.position.z = Math.random() * magicNumber1 - magicNumber2;
        particle.scale.x = particle.scale.y =  0.5;
        // scene.add( particle );
        Particle3D.particlesGroup.add( particle )
        
        particles.push(particle); 
    }

    scene.add( Particle3D.particlesGroup );
}

function updateParticles() {

    for(var i = 0; i<particles.length; i++) {

        var particle = particles[i]; 
        particle.updatePhysics(); 

        with(particle.position) {
            if(y<-magicNumber2) y+=magicNumber1; 
            if(x>magicNumber2) x-=magicNumber1; 
            else if(x<-magicNumber2) x+=magicNumber1; 
            if(z>magicNumber2) z-=magicNumber1; 
            else if(z<-magicNumber2) z+=magicNumber1; 
        }                
    }
}
