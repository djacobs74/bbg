new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		enemyHealth: 0,
		timer: 50,
		zombieType: 'No',
		room: 0,
		betaComponents: 0,
		beta_b: 0,
		beta_e: 0,
		beta_t: 0,
		beta_a: 0,
		searchChance: 100,
		medPacks: 0,
		virusPatch: 0,
		turns: [],
		chanceText: '',
		summon_dermajicker: 'false',
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
			} else if (this.zombieType == 'Der Majicker') {
				damage = this.numberGenerator(15, 20);
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
	        	this.searchChance = 100;
	        	this.turns.unshift({
	                isMove: true,
	                text: 'You move into a new Room. ' + zombieType + ' Zombie in here!'
	            });
	        }
	        this.chances();
        },
        zombieDead: function() {
        	if (this.enemyHealth <= 0) {
        		this.zombieType = 'No';
        	}
		},
		searchRoom: function() {
			var searches_left = 0;
			if (this.searchChance == 100) {
				searches_left = 3;
			} else if (this.searchChance == 75) {
				searches_left = 2;
			} else if (this.searchChance == 50) {
				searches_left = 1;
			} else if (this.searchChance == 25) {
				searches_left = 0;
			}
			

			if (this.zombieType == 'No' && this.room != 0 && this.searchChance > 0) {
				betaComp = (this.numberGenerator(1, 10) + searches_left);
				meds     = (this.numberGenerator(1, 10) + searches_left);
				patch    = (this.numberGenerator(1, 10) + searches_left);
				if (betaComp >= 9 && betaComp <= 13) {
					this.betaComponents += 1;
					this.betaType();
				}
				if (this.medPacks < 3) {
					if (meds >= 9 && meds <= 13) {
						this.medPacks += 1;
					}
				}
				if (this.virusPatch < 1) {
					if (patch >= 9 && patch <= 13) {
						this.virusPatch += 1;
					}
				}
				this.turnCounter();
				this.searchChance -= 25;
				this.chances();
				this.betaCheck();
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
        	var his_her = '';
        	var result = this.numberGenerator(1, 2);
        	if (result == 1) {
        		his_her = 'his';
        	} else {
        		his_her = 'her'
        	}

			if (this.zombieType != 'No' && this.virusPatch == 1) {
				this.turnCounter();
				this.turns.unshift({
	                isPatched: true,
	                text: 'You patched a ' + this.zombieType + ' zombie! The Giantcorp employee thanks you and runs for ' + his_her + ' life!' 
	            });
	            this.zombieType = 'No';
	            this.virusPatch -= 1;
			} 

		},
		chances: function() {
			if (this.searchChance == 100) {
				this.chanceText = ' Excellent!'
			} else if (this.searchChance == 75) {
				this.chanceText = ' Not Bad.'
			} else if (this.searchChance == 50) {
				this.chanceText = ' Could Be Better.'
			} else if (this.searchChance == 25) {
				this.chanceText = ' Not Great . . .'
			}
		},
		betaType: function() {
			result = this.numberGenerator(1, 4);
			if (result == 1) {
				this.beta_b += 1;
			} else if (result == 2) {
				this.beta_e += 1;
			} else if (result == 3) {
				this.beta_t += 1;
			} else {
				this.beta_a += 1;
			}
			console.log('betaType result = ' + result);
		},
		betaCheck: function() {
			if (this.beta_b > 0 && this.beta_e > 0 && this.beta_t > 0 && this.beta_a > 0) {
				this.summon_dermajicker = 'true';
			} else {
				this.summon_dermajicker = 'false';
			}
			console.log('beta check ' + this.summon_dermajicker);
		},
		use_beta: function() {
			if (this.zombieType == 'No') {
				this.zombieType = 'Der Majicker';
				this.zombieHealth = 100;
			}
		}
	},

})

