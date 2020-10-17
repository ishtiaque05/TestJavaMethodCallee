package com.github.stokito.unitTestExample.calculator;

import junit.framework.Assert;
import org.junit.Test;

public class CalculatorTest {

	@Test
	public void testSum() {
		// Given
		Calculator calculator = new Calculator();
		// When
		int result = calculator.sum(2, 2);
		int iby4 = calculator.incrementBy4(result);
		// Then
		Assert.assertTrue(result == 4);
		Assert.assertEquals(8, iby4);
	}

	public void testMinus() {
		Calculator calculator = new Calculator();
		int result = calculator.minus(10, 5);
		Assert.assertEquals(5, result);
	}
}
