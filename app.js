new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		enemyHealth: 0,
		timer: 50,
		zombieType: 'None',
		room: 1,
		betaComponents: 0,
		searchChance: 3,
		medPacks: 0,
		turns: [],
	},
	methods: {
		phillipAttack: function() {
			if (this.zombieType != 'None') {
				var damage = this.numberGenerator(20, 40);
				var deal = 'You deal ' + damage + ' damage to ' + this.zombieType + ' Zombie'
				var dead = 'You Kill ' + this.zombieType + ' Zombie!!'
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
			var damage = this.numberGenerator(3, 10);
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
        	if (this.zombieType == 'None' && this.playerHealth < 100 && this.medPacks >= 1) {
	        	var heal = this.numberGenerator(4, 10);
	        	this.playerHealth += heal;
	        	if (this.playerHealth > 100) {
	        		this.playerHealth = 100;
	        	} else {
	        		this.playerHealth;
	        	}
	        	this.turnCounter();
	        	this.medPacks -= 1;
	        }
        },
        numberGenerator: function(min, max) {
        	return Math.max(Math.floor(Math.random() * max) + 1, min);
    
        },
        move: function() {
        	var zombieType = '';
        	var zombieHealth = '';

        	if (this.zombieType === 'None') {

	        	result = this.numberGenerator(1, 12);
	        	if (result >= 1 && result <= 3) {
	        		zombieType = 'Alpha';
	        		zombieHealth = 50;
	        	} else if (result >= 3 && result <= 6) {
	        		zombieType = 'Beta';
	        		zombieHealth = 75;
	        	} else if (result >= 7 && result <= 9) {
	        		zombieType = 'Zed';
	        		zombieHealth = 100;
	        	} else {
	        		zombieType = 'None';
	        	}
	        	this.zombieType = zombieType;
	        	this.enemyHealth = zombieHealth;
	        	this.room += 1;
	        	this.turnCounter();
	        	this.searchChance = 3;
	        }
        },
        zombieDead: function() {
        	if (this.enemyHealth <= 0) {
        		this.zombieType = 'None';
        	}
		},
		searchRoom: function() {
			if (this.zombieType == 'None' && this.room != 1 && this.searchChance > 0) {
				betaComp = (this.numberGenerator(1, 10) + this.searchChance);
				meds     = (this.numberGenerator(1, 10) + this.searchChance);
				if (betaComp >= 11 && betaComp <= 13) {
					this.betaComponents += 1;
				}
				if (this.medPacks < 3) {
					if (meds >= 10 && meds <= 13) {
						this.medPacks += 1;
					}
				}
				this.turnCounter();
				this.searchChance -= 1;
				console.log('betaComp ' + betaComp);
				console.log('meds ' + meds);
			}
		}
	},

})

