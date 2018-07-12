new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		enemyHealth: 0,
		timer: 50,
		zombieType: 'No',
		room: 1,
		betaComponents: 0,
		searchChance: 3,
		medPacks: 0,
		virusPatch: 0,
		turns: [],
	},
	methods: {
		phillipAttack: function() {
			if (this.zombieType != 'No') {
				var damage = this.numberGenerator(20, 40);
				var deal = 'You deal ' + damage + ' damage to ' + this.zombieType + ' Zombie'
				var dead = 'You deal ' + damage + ' damage and kill ' + this.zombieType + ' Zombie!!'
				this.enemyHealth -= damage;
				this.enemyAttacks();
				this.turnCounter();
				if (this.enemyHealth <= 0) {
					this.turns.unshift({
		                isPlayer: true,
		                text: dead 
		            });
				} else {
					this.turns.unshift({
		                isPlayer: true,
		                text: deal 
		            });
		         }

	            this.zombieDead();
			}
		},
		enemyAttacks: function() {
			var damage = 0;
			if (this.zombieType == 'Alpha') {
				damage = this.numberGenerator(3, 6);
			} else if (this.zombieType == 'Beta') {
				damage = this.numberGenerator(5, 10);
			} else if (this.zombieType == 'Zed') {
				damage = this.numberGenerator(8, 12);
			}

			this.playerHealth -= damage;
			this.turns.unshift({
	                isPlayer: false,
	                text: this.zombieType + ' Zombie deals ' + damage + ' damage to you!'
	            });
		},
        turnCounter: function() {
        	this.timer -= 1;

        },
        phillipHeal: function() {
        	if (this.zombieType == 'No' && this.playerHealth < 100 && this.medPacks >= 1) {
	        	var heal = this.numberGenerator(10, 20);
	        	this.playerHealth += heal;
	        	if (this.playerHealth > 100) {
	        		this.playerHealth = 100;
	        	} else {
	        		this.playerHealth;
	        	}
	        	this.turnCounter();
	        	this.medPacks -= 1;
	        	this.turns.unshift({
	                isHeal: true,
	                text: 'You use a medpack and heal for ' + heal + ' health'
	            });
	        }
        },
        numberGenerator: function(min, max) {
        	return Math.max(Math.floor(Math.random() * max) + 1, min);
    
        },
        move: function() {
        	var zombieType = '';
        	var zombieHealth = '';

        	if (this.zombieType === 'No') {

	        	result = this.numberGenerator(1, 12);
	        	if (result >= 1 && result <= 3) {
	        		zombieType = 'Alpha';
	        		zombieHealth = 25;
	        	} else if (result >= 3 && result <= 6) {
	        		zombieType = 'Beta';
	        		zombieHealth = 50;
	        	} else if (result >= 7 && result <= 9) {
	        		zombieType = 'Zed';
	        		zombieHealth = 75;
	        	} else {
	        		zombieType = 'No';
	        	}
	        	this.zombieType = zombieType;
	        	this.enemyHealth = zombieHealth;
	        	this.room += 1;
	        	this.turnCounter();
	        	this.searchChance = 3;
	        	this.turns.unshift({
	                isMove: true,
	                text: 'You move into a new Room. ' + zombieType + ' Zombie in here!'
	            });
	        }
        },
        zombieDead: function() {
        	if (this.enemyHealth <= 0) {
        		this.zombieType = 'No';
        	}
		},
		searchRoom: function() {
			if (this.zombieType == 'No' && this.room != 1 && this.searchChance > 0) {
				betaComp = (this.numberGenerator(1, 10) + this.searchChance);
				meds     = (this.numberGenerator(1, 10) + this.searchChance);
				patch    = (this.numberGenerator(1, 10) + this.searchChance);
				if (betaComp >= 11 && betaComp <= 13) {
					this.betaComponents += 1;
				}
				if (this.medPacks < 3) {
					if (meds >= 10 && meds <= 13) {
						this.medPacks += 1;
					}
				}
				if (this.virusPatch < 1) {
					if (patch == 10) {
						this.virusPatch += 1;
					}
				}
				this.turnCounter();
				this.searchChance -= 1;
				console.log('betaComp ' + betaComp);
				console.log('meds ' + meds);
				console.log('patch ' + patch);
			}
		},
		rest: function() {
        	if (this.zombieType == 'No' && this.playerHealth < 100) {
	        	var heal = this.numberGenerator(4, 8);
	        	this.playerHealth += heal;
	        	if (this.playerHealth > 100) {
	        		this.playerHealth = 100;
	        	} else {
	        		this.playerHealth;
	        	}
	        	this.turnCounter();
	        	this.turns.unshift({
	                isRest: true,
	                text: 'You rest and heal for ' + heal + ' health'
	            });
	        }
        },
        patchZombie: function() {
			if (this.zombieType != 'No' && this.virusPatch == 1) {
				this.turnCounter();
				this.turns.unshift({
	                isPatched: true,
	                text: 'You patched a zombie!' 
	            });
	            this.zombieType = 'No';
			} 

		},
	},

})

