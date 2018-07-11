new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		enemyHealth: 100,
		turns: 10,
		zombieType: 'None',
	},
	methods: {
		phillipAttack: function() {
			var damage = this.calculateDamage(5, 10);
			this.enemyHealth -= damage;
			this.enemyAttacks();
			this.turnCounter();
		},
		enemyAttacks: function() {
			var damage = this.calculateDamage(3, 10);
			this.playerHealth -= damage;

		},
		calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        calculateHeal: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        turnCounter: function() {
        	this.turns -= 1;

        },
        phillipHeal: function() {
        	var heal = this.calculateHeal(4, 10);
        	this.playerHealth += heal;
        	if (this.playerHealth > 100) {
        		this.playerHealth = 100;
        	} else {
        		this.playerHealth;
        	}
        	this.turnCounter();
        },
        zombieGenerator: function(min, max) {
        	return Math.max(Math.floor(Math.random() * max) + 1, min);
    
        },
        move: function() {
        	var zombie = '';

        	result = this.zombieGenerator(1, 12);
        	if (result >= 1 && result <= 3) {
        		zombie = 'Alpha';
        	} else if (result >= 3 && result <= 6) {
        		zombie = 'Beta';
        	} else if (result >= 7 && result <= 9) {
        		zombie = 'Zed';
        	} else {
        		zombie = 'None';
        	}
        	this.zombieType = zombie
        	this.healthReset();
        	this.turnCounter();
        },
        healthReset: function() {
        	this.enemyHealth = 100;
        }
	}
})

